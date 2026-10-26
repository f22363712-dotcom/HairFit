const views={
 front:{label:'正面',position:[0,.16,4.75]},
 left:{label:'左侧',position:[-4.75,.16,0]},
 right:{label:'右侧',position:[4.75,.16,0]},
 back:{label:'后脑',position:[0,.16,-4.75]}
};
export function studioView(name){const view=views[name];return view?{label:view.label,position:[...view.position],target:[0,-.18,0]}:null;}
