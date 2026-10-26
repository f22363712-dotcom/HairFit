/** All hit samples come from the currently visible curve, including its fractional tip. */
export function sampleVisiblePoint(base,strand,segments,cut,step,out){
  const t=Math.max(0,Math.min(cut,step,segments));
  const lo=Math.floor(t),hi=Math.min(segments,lo+1),f=t-lo;
  const a=(strand*(segments+1)+lo)*3,b=(strand*(segments+1)+hi)*3;
  out.x=base[a]+(base[b]-base[a])*f;
  out.y=base[a+1]+(base[b+1]-base[a+1])*f;
  out.z=base[a+2]+(base[b+2]-base[a+2])*f;
  return out;
}
export function sampleDetachedPoint(base,strand,segments,from,to,step,out){
  return sampleVisiblePoint(base,strand,segments,to,Math.max(from,step),out);
}
export function nextCutPosition({current,hit,minimum=1.5,stepTrim=1.35,weight=1,jitter=0,intent='drag'}){
  if(current<=minimum || (intent==='snip' && current-minimum<.35))return current;
  const visibleHit=Math.min(hit,current);
  let next;
  if(intent==='snip'){
    // One closure is one complete action, rather than one tiny pointer-move increment.
    const depth=Math.max(2,Math.min(4.5,stepTrim*2.4));
    next=Math.min(current-depth,visibleHit-.35+jitter*.2);
  }else{
    const step=stepTrim*(.45+.55*Math.max(0,Math.min(1,weight)));
    next=Math.max(visibleHit-.35+jitter,current-step);
  }
  return Math.max(minimum,Math.min(current,next));
}
export function writeRibbonStrand(base,positions,progress,strand,segments,cut){
  const point={x:0,y:0,z:0};
  for(let k=0;k<=segments;k++){
    sampleVisiblePoint(base,strand,segments,cut,k,point);
    const v=(strand*(segments+1)+k)*2,i=v*3;
    positions[i]=positions[i+3]=point.x;
    positions[i+1]=positions[i+4]=point.y;
    positions[i+2]=positions[i+5]=point.z;
    progress[v]=progress[v+1]=Math.min(1,k/Math.max(.5,cut));
  }
}
