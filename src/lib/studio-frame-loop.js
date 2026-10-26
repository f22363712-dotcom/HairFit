/** Camera acquisition must continue on frames where drawing is skipped. */
export function createStudioFrameLoop({track,draw,isCameraActive,needsDraw=()=>true,observe=()=>{}}){
 let lastDraw=-Infinity;
 return time=>{
  observe(time);
  track(time);
  if(!needsDraw())return;
  if(isCameraActive() && time-lastDraw<1000/30-.5)return;
  lastDraw=time;draw(time);
 };
}
