import type {Requirements} from './types';
export function RequirementSummary({requirements}:{requirements?:Requirements}){
 if(!requirements||!Object.values(requirements).some(value=>Array.isArray(value)?value.length:!!value))return null;
 const labels:Record<string,string>={sitting:'Sitting',cooking:'Cooking assistant',cleaner:'Cleaning appliance',walking:'Walking robot',table:'Table',stand:'Stand',enclosure:'Enclosure',tray:'Tray',bracket:'Bracket'};
 return <div className="agreed-requirements"><h3>Your requirements</h3><dl>{requirements.purpose&&<><dt>Purpose</dt><dd>{labels[requirements.purpose]||requirements.purpose}</dd></>}{requirements.form&&<><dt>Form</dt><dd>{requirements.form}</dd></>}{requirements.tasks.length>0&&<><dt>Tasks</dt><dd>{requirements.tasks.join(', ')}</dd></>}{requirements.size&&<><dt>Size</dt><dd>{requirements.size}</dd></>}</dl></div>;
}
