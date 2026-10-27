"""Render an immutable evaluation JSON as a readable Markdown report."""
import argparse
import html
import json
from pathlib import Path


def cell(value):return html.escape(str(value)).replace('|',r'\|').replace('\n',' ')


def render(report):
    counts=report['summary']
    lines=['# Modeling evaluation result','',f"Run: `{report['run_id']}`",f"Mode: **{report['mode']}**; split: **{report['split']}**.",f"Provider: {report['provider']}; model: `{report['model']}`.",f"Fixture SHA-256: `{report['fixture_sha256']}`",'',
      f"Scenarios: **{counts['passed']} passed, {counts['failed']} failed, {counts['blocked']} blocked, {counts['not_run']} not run**, out of {counts['total_scenarios']}.",
      f"Provider/scripted-model attempts: {len(report['model_requests'])}. Total measured runtime: {report['total_elapsed_seconds']} seconds.",
      f"Stop reason: {report.get('stop_reason') or 'none'}.",'',
      '**Offline scripted passes are not Gemini language-quality results. Blocked/unrun cases are not successes.**','',
      '| Scenario | Status | Initial s | Edit s | Restore s | Model attempts | Failed checks / reason |','| --- | --- | ---: | ---: | ---: | ---: | --- |']
    for case in report['cases']:
        stages={s['stage']:s for s in case['steps']};bad=[]
        for step in case['steps']:
            for group in ('intent_checks','geometry_checks','exports'):
                bad.extend(step['stage']+': '+name for name,value in step.get(group,{}).items() if not value)
            for name in ('approval_gate_verified','proposal_has_no_cad'):
                if step.get(name) is False:bad.append(step['stage']+': '+name)
        reason='; '.join(bad) or case.get('reason','')
        lines.append('| '+ ' | '.join(map(cell,[case['id'],case['status'],stages.get('initial',{}).get('elapsed_seconds','—'),stages.get('edit',{}).get('elapsed_seconds','—'),stages.get('restore',{}).get('elapsed_seconds','—'),sum(s.get('model_requests',0) for s in case['steps']),reason or '—']))+' |')
    lines+=['','Step times include local server work, automatic harness approval/build and pacing waits. Individual SDK call timings below exclude those waits. Human review time is not measured.','',
      '| Model attempt | Scenario / stage | Status | API s | Total tokens if provided |','| ---: | --- | --- | ---: | ---: |']
    for i,call in enumerate(report['model_requests'],1):
        lines.append('| '+' | '.join(map(cell,[i,call['case']+' / '+str(call['stage']),call['status'],call['latency_seconds'],call.get('total_token_count','—')]))+' |')
    classifier=report.get('classifier',{})
    if classifier:
        lines+=['','## Saved classifier evaluation','',f"Threshold: {classifier['threshold']}. Source groups disjoint: {classifier['group_disjoint']}.",'',
          '| Split | Examples | Accuracy | Macro F1 |','| --- | ---: | ---: | ---: |']
        for name,metrics in classifier['splits'].items():lines.append(f"| {name} | {metrics['count']} | {metrics['accuracy']} | {metrics['macro_f1']} |")
        lines+=['',classifier['limitations']]
    lines+=['','## Limits','']+['- '+text for text in report['limitations']]
    return '\n'.join(lines)+'\n'


def main():
    parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('report',type=Path);args=parser.parse_args()
    report=json.loads(args.report.read_text(encoding='utf-8'));output=args.report.with_suffix('.md')
    with output.open('x',encoding='utf-8') as file:file.write(render(report))
    print(output)


if __name__=='__main__':main()
