(()=>{var _e=0,vi=1,We=2;var Ls=1;var Ds=100;var Us=204,Ns=205;var Zs=0,$s=1,Js=2,gn=3,Ks=4,Qs=5,js=6,tr=7,po=0;var er=300;var Fs=1e3,pn=1001,Bs=1002;var mo=1006;var go=1008;var _o=1009;var xo=1015;var yo=1023;var _n=2300,ii=2301,ei=2302,Os=2400,zs=2401,Vs=2402;var nr="",vt="srgb",ks="srgb-linear",Hs="linear",ni="srgb";var me=7680;var Gs=519;var Ws=35044;var mn=2e3,Xs=2001,xe=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let i=this._listeners[t];if(i!==void 0){let s=i.indexOf(e);s!==-1&&i.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let n=this._listeners[t.type];if(n!==void 0){t.target=this;let i=n.slice(0);for(let s=0,r=i.length;s<r;s++)i[s].call(this,t);t.target=null}}},at=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Yh=Math.PI/180,Ka=180/Math.PI;function Sn(){let c=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(at[c&255]+at[c>>8&255]+at[c>>16&255]+at[c>>24&255]+"-"+at[t&255]+at[t>>8&255]+"-"+at[t>>16&15|64]+at[t>>24&255]+"-"+at[e&63|128]+at[e>>8&255]+"-"+at[e>>16&255]+at[e>>24&255]+at[n&255]+at[n>>8&255]+at[n>>16&255]+at[n>>24&255]).toLowerCase()}function F(c,t,e){return Math.max(t,Math.min(e,c))}function Qa(c,t){return(c%t+t)%t}function hs(c,t,e){return(1-e)*c+e*t}function ln(c,t){switch(t.constructor){case Float32Array:return c;case Uint32Array:return c/4294967295;case Uint16Array:return c/65535;case Uint8Array:return c/255;case Int32Array:return Math.max(c/2147483647,-1);case Int16Array:return Math.max(c/32767,-1);case Int8Array:return Math.max(c/127,-1);default:throw new Error("Invalid component type.")}}function pt(c,t){switch(t.constructor){case Float32Array:return c;case Uint32Array:return Math.round(c*4294967295);case Uint16Array:return Math.round(c*65535);case Uint8Array:return Math.round(c*255);case Int32Array:return Math.round(c*2147483647);case Int16Array:return Math.round(c*32767);case Int8Array:return Math.round(c*127);default:throw new Error("Invalid component type.")}}var G=class c{constructor(t=0,e=0){c.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=F(this.x,t.x,e.x),this.y=F(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=F(this.x,t,e),this.y=F(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(F(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(F(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),i=Math.sin(e),s=this.x-t.x,r=this.y-t.y;return this.x=s*n-r*i+t.x,this.y=s*i+r*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},U=class c{constructor(t,e,n,i,s,r,a,o,u){c.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,r,a,o,u)}set(t,e,n,i,s,r,a,o,u){let l=this.elements;return l[0]=t,l[1]=i,l[2]=a,l[3]=e,l[4]=s,l[5]=o,l[6]=n,l[7]=r,l[8]=u,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,s=this.elements,r=n[0],a=n[3],o=n[6],u=n[1],l=n[4],h=n[7],f=n[2],d=n[5],p=n[8],m=i[0],y=i[3],g=i[6],_=i[1],v=i[4],x=i[7],M=i[2],A=i[5],b=i[8];return s[0]=r*m+a*_+o*M,s[3]=r*y+a*v+o*A,s[6]=r*g+a*x+o*b,s[1]=u*m+l*_+h*M,s[4]=u*y+l*v+h*A,s[7]=u*g+l*x+h*b,s[2]=f*m+d*_+p*M,s[5]=f*y+d*v+p*A,s[8]=f*g+d*x+p*b,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],r=t[4],a=t[5],o=t[6],u=t[7],l=t[8];return e*r*l-e*a*u-n*s*l+n*a*o+i*s*u-i*r*o}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],r=t[4],a=t[5],o=t[6],u=t[7],l=t[8],h=l*r-a*u,f=a*o-l*s,d=u*s-r*o,p=e*h+n*f+i*d;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return t[0]=h*m,t[1]=(i*u-l*n)*m,t[2]=(a*n-i*r)*m,t[3]=f*m,t[4]=(l*e-i*o)*m,t[5]=(i*s-a*e)*m,t[6]=d*m,t[7]=(n*o-u*e)*m,t[8]=(r*e-n*s)*m,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,s,r,a){let o=Math.cos(s),u=Math.sin(s);return this.set(n*o,n*u,-n*(o*r+u*a)+r+t,-i*u,i*o,-i*(-u*r+o*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(fs.makeScale(t,e)),this}rotate(t){return this.premultiply(fs.makeRotation(-t)),this}translate(t,e){return this.premultiply(fs.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},fs=new U;function vo(c){for(let t=c.length-1;t>=0;--t)if(c[t]>=65535)return!0;return!1}function qs(c){return document.createElementNS("http://www.w3.org/1999/xhtml",c)}var Qr=new U().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),jr=new U().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function ja(){let c={enabled:!0,workingColorSpace:ks,spaces:{},convert:function(i,s,r){return this.enabled===!1||s===r||!s||!r||(this.spaces[s].transfer===ni&&(i.r=Vt(i.r),i.g=Vt(i.g),i.b=Vt(i.b)),this.spaces[s].primaries!==this.spaces[r].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[r].fromXYZ)),this.spaces[r].transfer===ni&&(i.r=ke(i.r),i.g=ke(i.g),i.b=ke(i.b))),i},fromWorkingColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},toWorkingColorSpace:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===nr?Hs:this.spaces[i].transfer},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,r){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[r].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return c.define({[ks]:{primaries:t,whitePoint:n,transfer:Hs,toXYZ:Qr,fromXYZ:jr,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:vt},outputColorSpaceConfig:{drawingBufferColorSpace:vt}},[vt]:{primaries:t,whitePoint:n,transfer:ni,toXYZ:Qr,fromXYZ:jr,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:vt}}}),c}var yt=ja();function Vt(c){return c<.04045?c*.0773993808:Math.pow(c*.9478672986+.0521327014,2.4)}function ke(c){return c<.0031308?c*12.92:1.055*Math.pow(c,.41666)-.055}var Pe,si=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Pe===void 0&&(Pe=qs("canvas")),Pe.width=t.width,Pe.height=t.height;let n=Pe.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Pe}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=qs("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let i=n.getImageData(0,0,t.width,t.height),s=i.data;for(let r=0;r<s.length;r++)s[r]=Vt(s[r]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Vt(e[n]/255)*255):e[n]=Vt(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},tc=0,ri=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:tc++}),this.uuid=Sn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let r=0,a=i.length;r<a;r++)i[r].isDataTexture?s.push(ds(i[r].image)):s.push(ds(i[r]))}else s=ds(i);n.url=s}return e||(t.images[this.uuid]=n),n}};function ds(c){return typeof HTMLImageElement<"u"&&c instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&c instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&c instanceof ImageBitmap?si.getDataURL(c):c.data?{data:Array.from(c.data),width:c.width,height:c.height,type:c.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var ec=0,He=class c extends xe{constructor(t=c.DEFAULT_IMAGE,e=c.DEFAULT_MAPPING,n=pn,i=pn,s=mo,r=go,a=yo,o=_o,u=c.DEFAULT_ANISOTROPY,l=nr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ec++}),this.uuid=Sn(),this.name="",this.source=new ri(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=r,this.anisotropy=u,this.format=a,this.internalFormat=null,this.type=o,this.offset=new G(0,0),this.repeat=new G(1,1),this.center=new G(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new U,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=l,this.userData={},this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==er)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Fs:t.x=t.x-Math.floor(t.x);break;case pn:t.x=t.x<0?0:1;break;case Bs:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Fs:t.y=t.y-Math.floor(t.y);break;case pn:t.y=t.y<0?0:1;break;case Bs:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};He.DEFAULT_IMAGE=null;He.DEFAULT_MAPPING=er;He.DEFAULT_ANISOTROPY=1;var ut=class c{constructor(t=0,e=0,n=0,i=1){c.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,s=this.w,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i+r[12]*s,this.y=r[1]*e+r[5]*n+r[9]*i+r[13]*s,this.z=r[2]*e+r[6]*n+r[10]*i+r[14]*s,this.w=r[3]*e+r[7]*n+r[11]*i+r[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,s,o=t.elements,u=o[0],l=o[4],h=o[8],f=o[1],d=o[5],p=o[9],m=o[2],y=o[6],g=o[10];if(Math.abs(l-f)<.01&&Math.abs(h-m)<.01&&Math.abs(p-y)<.01){if(Math.abs(l+f)<.1&&Math.abs(h+m)<.1&&Math.abs(p+y)<.1&&Math.abs(u+d+g-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let v=(u+1)/2,x=(d+1)/2,M=(g+1)/2,A=(l+f)/4,b=(h+m)/4,T=(p+y)/4;return v>x&&v>M?v<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(v),i=A/n,s=b/n):x>M?x<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(x),n=A/i,s=T/i):M<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(M),n=b/s,i=T/s),this.set(n,i,s,e),this}let _=Math.sqrt((y-p)*(y-p)+(h-m)*(h-m)+(f-l)*(f-l));return Math.abs(_)<.001&&(_=1),this.x=(y-p)/_,this.y=(h-m)/_,this.z=(f-l)/_,this.w=Math.acos((u+d+g-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=F(this.x,t.x,e.x),this.y=F(this.y,t.y,e.y),this.z=F(this.z,t.z,e.z),this.w=F(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=F(this.x,t,e),this.y=F(this.y,t,e),this.z=F(this.z,t,e),this.w=F(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(F(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};var kt=class{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,s,r,a){let o=n[i+0],u=n[i+1],l=n[i+2],h=n[i+3],f=s[r+0],d=s[r+1],p=s[r+2],m=s[r+3];if(a===0){t[e+0]=o,t[e+1]=u,t[e+2]=l,t[e+3]=h;return}if(a===1){t[e+0]=f,t[e+1]=d,t[e+2]=p,t[e+3]=m;return}if(h!==m||o!==f||u!==d||l!==p){let y=1-a,g=o*f+u*d+l*p+h*m,_=g>=0?1:-1,v=1-g*g;if(v>Number.EPSILON){let M=Math.sqrt(v),A=Math.atan2(M,g*_);y=Math.sin(y*A)/M,a=Math.sin(a*A)/M}let x=a*_;if(o=o*y+f*x,u=u*y+d*x,l=l*y+p*x,h=h*y+m*x,y===1-a){let M=1/Math.sqrt(o*o+u*u+l*l+h*h);o*=M,u*=M,l*=M,h*=M}}t[e]=o,t[e+1]=u,t[e+2]=l,t[e+3]=h}static multiplyQuaternionsFlat(t,e,n,i,s,r){let a=n[i],o=n[i+1],u=n[i+2],l=n[i+3],h=s[r],f=s[r+1],d=s[r+2],p=s[r+3];return t[e]=a*p+l*h+o*d-u*f,t[e+1]=o*p+l*f+u*h-a*d,t[e+2]=u*p+l*d+a*f-o*h,t[e+3]=l*p-a*h-o*f-u*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,i=t._y,s=t._z,r=t._order,a=Math.cos,o=Math.sin,u=a(n/2),l=a(i/2),h=a(s/2),f=o(n/2),d=o(i/2),p=o(s/2);switch(r){case"XYZ":this._x=f*l*h+u*d*p,this._y=u*d*h-f*l*p,this._z=u*l*p+f*d*h,this._w=u*l*h-f*d*p;break;case"YXZ":this._x=f*l*h+u*d*p,this._y=u*d*h-f*l*p,this._z=u*l*p-f*d*h,this._w=u*l*h+f*d*p;break;case"ZXY":this._x=f*l*h-u*d*p,this._y=u*d*h+f*l*p,this._z=u*l*p+f*d*h,this._w=u*l*h-f*d*p;break;case"ZYX":this._x=f*l*h-u*d*p,this._y=u*d*h+f*l*p,this._z=u*l*p-f*d*h,this._w=u*l*h+f*d*p;break;case"YZX":this._x=f*l*h+u*d*p,this._y=u*d*h+f*l*p,this._z=u*l*p-f*d*h,this._w=u*l*h-f*d*p;break;case"XZY":this._x=f*l*h-u*d*p,this._y=u*d*h-f*l*p,this._z=u*l*p+f*d*h,this._w=u*l*h+f*d*p;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+r)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],i=e[4],s=e[8],r=e[1],a=e[5],o=e[9],u=e[2],l=e[6],h=e[10],f=n+a+h;if(f>0){let d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(l-o)*d,this._y=(s-u)*d,this._z=(r-i)*d}else if(n>a&&n>h){let d=2*Math.sqrt(1+n-a-h);this._w=(l-o)/d,this._x=.25*d,this._y=(i+r)/d,this._z=(s+u)/d}else if(a>h){let d=2*Math.sqrt(1+a-n-h);this._w=(s-u)/d,this._x=(i+r)/d,this._y=.25*d,this._z=(o+l)/d}else{let d=2*Math.sqrt(1+h-n-a);this._w=(r-i)/d,this._x=(s+u)/d,this._y=(o+l)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(F(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,i=t._y,s=t._z,r=t._w,a=e._x,o=e._y,u=e._z,l=e._w;return this._x=n*l+r*a+i*u-s*o,this._y=i*l+r*o+s*a-n*u,this._z=s*l+r*u+n*o-i*a,this._w=r*l-n*a-i*o-s*u,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,i=this._y,s=this._z,r=this._w,a=r*t._w+n*t._x+i*t._y+s*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=r,this._x=n,this._y=i,this._z=s,this;let o=1-a*a;if(o<=Number.EPSILON){let d=1-e;return this._w=d*r+e*this._w,this._x=d*n+e*this._x,this._y=d*i+e*this._y,this._z=d*s+e*this._z,this.normalize(),this}let u=Math.sqrt(o),l=Math.atan2(u,a),h=Math.sin((1-e)*l)/u,f=Math.sin(e*l)/u;return this._w=r*h+this._w*f,this._x=n*h+this._x*f,this._y=i*h+this._y*f,this._z=s*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},S=class c{constructor(t=0,e=0,n=0){c.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(to.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(to.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*i,this.y=s[1]*e+s[4]*n+s[7]*i,this.z=s[2]*e+s[5]*n+s[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,s=t.elements,r=1/(s[3]*e+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*i+s[12])*r,this.y=(s[1]*e+s[5]*n+s[9]*i+s[13])*r,this.z=(s[2]*e+s[6]*n+s[10]*i+s[14])*r,this}applyQuaternion(t){let e=this.x,n=this.y,i=this.z,s=t.x,r=t.y,a=t.z,o=t.w,u=2*(r*i-a*n),l=2*(a*e-s*i),h=2*(s*n-r*e);return this.x=e+o*u+r*h-a*l,this.y=n+o*l+a*u-s*h,this.z=i+o*h+s*l-r*u,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*i,this.y=s[1]*e+s[5]*n+s[9]*i,this.z=s[2]*e+s[6]*n+s[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=F(this.x,t.x,e.x),this.y=F(this.y,t.y,e.y),this.z=F(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=F(this.x,t,e),this.y=F(this.y,t,e),this.z=F(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(F(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,i=t.y,s=t.z,r=e.x,a=e.y,o=e.z;return this.x=i*o-s*a,this.y=s*r-n*o,this.z=n*a-i*r,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return ps.copy(this).projectOnVector(t),this.sub(ps)}reflect(t){return this.sub(ps.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(F(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},ps=new S,to=new kt,J=class{constructor(t=new S(1/0,1/0,1/0),e=new S(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(At.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(At.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=At.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let r=0,a=s.count;r<a;r++)t.isMesh===!0?t.getVertexPosition(r,At):At.fromBufferAttribute(s,r),At.applyMatrix4(t.matrixWorld),this.expandByPoint(At);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Bn.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Bn.copy(n.boundingBox)),Bn.applyMatrix4(t.matrixWorld),this.union(Bn)}let i=t.children;for(let s=0,r=i.length;s<r;s++)this.expandByObject(i[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,At),At.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(un),On.subVectors(this.max,un),Le.subVectors(t.a,un),De.subVectors(t.b,un),Ue.subVectors(t.c,un),Kt.subVectors(De,Le),Qt.subVectors(Ue,De),fe.subVectors(Le,Ue);let e=[0,-Kt.z,Kt.y,0,-Qt.z,Qt.y,0,-fe.z,fe.y,Kt.z,0,-Kt.x,Qt.z,0,-Qt.x,fe.z,0,-fe.x,-Kt.y,Kt.x,0,-Qt.y,Qt.x,0,-fe.y,fe.x,0];return!ms(e,Le,De,Ue,On)||(e=[1,0,0,0,1,0,0,0,1],!ms(e,Le,De,Ue,On))?!1:(zn.crossVectors(Kt,Qt),e=[zn.x,zn.y,zn.z],ms(e,Le,De,Ue,On))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,At).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(At).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Nt[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Nt[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Nt[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Nt[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Nt[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Nt[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Nt[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Nt[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Nt),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},Nt=[new S,new S,new S,new S,new S,new S,new S,new S],At=new S,Bn=new J,Le=new S,De=new S,Ue=new S,Kt=new S,Qt=new S,fe=new S,un=new S,On=new S,zn=new S,de=new S;function ms(c,t,e,n,i){for(let s=0,r=c.length-3;s<=r;s+=3){de.fromArray(c,s);let a=i.x*Math.abs(de.x)+i.y*Math.abs(de.y)+i.z*Math.abs(de.z),o=t.dot(de),u=e.dot(de),l=n.dot(de);if(Math.max(-Math.max(o,u,l),Math.min(o,u,l))>a)return!1}return!0}var nc=new J,hn=new S,gs=new S,xn=class{constructor(t=new S,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):nc.setFromPoints(t).getCenter(n);let i=0;for(let s=0,r=t.length;s<r;s++)i=Math.max(i,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;hn.subVectors(t,this.center);let e=hn.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(hn,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(gs.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(hn.copy(t.center).add(gs)),this.expandByPoint(hn.copy(t.center).sub(gs))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},Ft=new S,_s=new S,Vn=new S,jt=new S,xs=new S,kn=new S,ys=new S,Lt=class{constructor(t=new S,e=new S(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Ft)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Ft.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Ft.copy(this.origin).addScaledVector(this.direction,e),Ft.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){_s.copy(t).add(e).multiplyScalar(.5),Vn.copy(e).sub(t).normalize(),jt.copy(this.origin).sub(_s);let s=t.distanceTo(e)*.5,r=-this.direction.dot(Vn),a=jt.dot(this.direction),o=-jt.dot(Vn),u=jt.lengthSq(),l=Math.abs(1-r*r),h,f,d,p;if(l>0)if(h=r*o-a,f=r*a-o,p=s*l,h>=0)if(f>=-p)if(f<=p){let m=1/l;h*=m,f*=m,d=h*(h+r*f+2*a)+f*(r*h+f+2*o)+u}else f=s,h=Math.max(0,-(r*f+a)),d=-h*h+f*(f+2*o)+u;else f=-s,h=Math.max(0,-(r*f+a)),d=-h*h+f*(f+2*o)+u;else f<=-p?(h=Math.max(0,-(-r*s+a)),f=h>0?-s:Math.min(Math.max(-s,-o),s),d=-h*h+f*(f+2*o)+u):f<=p?(h=0,f=Math.min(Math.max(-s,-o),s),d=f*(f+2*o)+u):(h=Math.max(0,-(r*s+a)),f=h>0?s:Math.min(Math.max(-s,-o),s),d=-h*h+f*(f+2*o)+u);else f=r>0?-s:s,h=Math.max(0,-(r*f+a)),d=-h*h+f*(f+2*o)+u;return n&&n.copy(this.origin).addScaledVector(this.direction,h),i&&i.copy(_s).addScaledVector(Vn,f),d}intersectSphere(t,e){Ft.subVectors(t.center,this.origin);let n=Ft.dot(this.direction),i=Ft.dot(Ft)-n*n,s=t.radius*t.radius;if(i>s)return null;let r=Math.sqrt(s-i),a=n-r,o=n+r;return o<0?null:a<0?this.at(o,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,s,r,a,o,u=1/this.direction.x,l=1/this.direction.y,h=1/this.direction.z,f=this.origin;return u>=0?(n=(t.min.x-f.x)*u,i=(t.max.x-f.x)*u):(n=(t.max.x-f.x)*u,i=(t.min.x-f.x)*u),l>=0?(s=(t.min.y-f.y)*l,r=(t.max.y-f.y)*l):(s=(t.max.y-f.y)*l,r=(t.min.y-f.y)*l),n>r||s>i||((s>n||isNaN(n))&&(n=s),(r<i||isNaN(i))&&(i=r),h>=0?(a=(t.min.z-f.z)*h,o=(t.max.z-f.z)*h):(a=(t.max.z-f.z)*h,o=(t.min.z-f.z)*h),n>o||a>i)||((a>n||n!==n)&&(n=a),(o<i||i!==i)&&(i=o),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,Ft)!==null}intersectTriangle(t,e,n,i,s){xs.subVectors(e,t),kn.subVectors(n,t),ys.crossVectors(xs,kn);let r=this.direction.dot(ys),a;if(r>0){if(i)return null;a=1}else if(r<0)a=-1,r=-r;else return null;jt.subVectors(this.origin,t);let o=a*this.direction.dot(kn.crossVectors(jt,kn));if(o<0)return null;let u=a*this.direction.dot(xs.cross(jt));if(u<0||o+u>r)return null;let l=-a*jt.dot(ys);return l<0?null:this.at(l/r,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},V=class c{constructor(t,e,n,i,s,r,a,o,u,l,h,f,d,p,m,y){c.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,r,a,o,u,l,h,f,d,p,m,y)}set(t,e,n,i,s,r,a,o,u,l,h,f,d,p,m,y){let g=this.elements;return g[0]=t,g[4]=e,g[8]=n,g[12]=i,g[1]=s,g[5]=r,g[9]=a,g[13]=o,g[2]=u,g[6]=l,g[10]=h,g[14]=f,g[3]=d,g[7]=p,g[11]=m,g[15]=y,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new c().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,i=1/Ne.setFromMatrixColumn(t,0).length(),s=1/Ne.setFromMatrixColumn(t,1).length(),r=1/Ne.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*r,e[9]=n[9]*r,e[10]=n[10]*r,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,i=t.y,s=t.z,r=Math.cos(n),a=Math.sin(n),o=Math.cos(i),u=Math.sin(i),l=Math.cos(s),h=Math.sin(s);if(t.order==="XYZ"){let f=r*l,d=r*h,p=a*l,m=a*h;e[0]=o*l,e[4]=-o*h,e[8]=u,e[1]=d+p*u,e[5]=f-m*u,e[9]=-a*o,e[2]=m-f*u,e[6]=p+d*u,e[10]=r*o}else if(t.order==="YXZ"){let f=o*l,d=o*h,p=u*l,m=u*h;e[0]=f+m*a,e[4]=p*a-d,e[8]=r*u,e[1]=r*h,e[5]=r*l,e[9]=-a,e[2]=d*a-p,e[6]=m+f*a,e[10]=r*o}else if(t.order==="ZXY"){let f=o*l,d=o*h,p=u*l,m=u*h;e[0]=f-m*a,e[4]=-r*h,e[8]=p+d*a,e[1]=d+p*a,e[5]=r*l,e[9]=m-f*a,e[2]=-r*u,e[6]=a,e[10]=r*o}else if(t.order==="ZYX"){let f=r*l,d=r*h,p=a*l,m=a*h;e[0]=o*l,e[4]=p*u-d,e[8]=f*u+m,e[1]=o*h,e[5]=m*u+f,e[9]=d*u-p,e[2]=-u,e[6]=a*o,e[10]=r*o}else if(t.order==="YZX"){let f=r*o,d=r*u,p=a*o,m=a*u;e[0]=o*l,e[4]=m-f*h,e[8]=p*h+d,e[1]=h,e[5]=r*l,e[9]=-a*l,e[2]=-u*l,e[6]=d*h+p,e[10]=f-m*h}else if(t.order==="XZY"){let f=r*o,d=r*u,p=a*o,m=a*u;e[0]=o*l,e[4]=-h,e[8]=u*l,e[1]=f*h+m,e[5]=r*l,e[9]=d*h-p,e[2]=p*h-d,e[6]=a*l,e[10]=m*h+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(ic,t,sc)}lookAt(t,e,n){let i=this.elements;return mt.subVectors(t,e),mt.lengthSq()===0&&(mt.z=1),mt.normalize(),te.crossVectors(n,mt),te.lengthSq()===0&&(Math.abs(n.z)===1?mt.x+=1e-4:mt.z+=1e-4,mt.normalize(),te.crossVectors(n,mt)),te.normalize(),Hn.crossVectors(mt,te),i[0]=te.x,i[4]=Hn.x,i[8]=mt.x,i[1]=te.y,i[5]=Hn.y,i[9]=mt.y,i[2]=te.z,i[6]=Hn.z,i[10]=mt.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,s=this.elements,r=n[0],a=n[4],o=n[8],u=n[12],l=n[1],h=n[5],f=n[9],d=n[13],p=n[2],m=n[6],y=n[10],g=n[14],_=n[3],v=n[7],x=n[11],M=n[15],A=i[0],b=i[4],T=i[8],C=i[12],E=i[1],I=i[5],w=i[9],R=i[13],P=i[2],D=i[6],N=i[10],ot=i[14],Zt=i[3],Ut=i[7],$t=i[11],Jt=i[15];return s[0]=r*A+a*E+o*P+u*Zt,s[4]=r*b+a*I+o*D+u*Ut,s[8]=r*T+a*w+o*N+u*$t,s[12]=r*C+a*R+o*ot+u*Jt,s[1]=l*A+h*E+f*P+d*Zt,s[5]=l*b+h*I+f*D+d*Ut,s[9]=l*T+h*w+f*N+d*$t,s[13]=l*C+h*R+f*ot+d*Jt,s[2]=p*A+m*E+y*P+g*Zt,s[6]=p*b+m*I+y*D+g*Ut,s[10]=p*T+m*w+y*N+g*$t,s[14]=p*C+m*R+y*ot+g*Jt,s[3]=_*A+v*E+x*P+M*Zt,s[7]=_*b+v*I+x*D+M*Ut,s[11]=_*T+v*w+x*N+M*$t,s[15]=_*C+v*R+x*ot+M*Jt,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],i=t[8],s=t[12],r=t[1],a=t[5],o=t[9],u=t[13],l=t[2],h=t[6],f=t[10],d=t[14],p=t[3],m=t[7],y=t[11],g=t[15];return p*(+s*o*h-i*u*h-s*a*f+n*u*f+i*a*d-n*o*d)+m*(+e*o*d-e*u*f+s*r*f-i*r*d+i*u*l-s*o*l)+y*(+e*u*h-e*a*d-s*r*h+n*r*d+s*a*l-n*u*l)+g*(-i*a*l-e*o*h+e*a*f+i*r*h-n*r*f+n*o*l)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],r=t[4],a=t[5],o=t[6],u=t[7],l=t[8],h=t[9],f=t[10],d=t[11],p=t[12],m=t[13],y=t[14],g=t[15],_=h*y*u-m*f*u+m*o*d-a*y*d-h*o*g+a*f*g,v=p*f*u-l*y*u-p*o*d+r*y*d+l*o*g-r*f*g,x=l*m*u-p*h*u+p*a*d-r*m*d-l*a*g+r*h*g,M=p*h*o-l*m*o-p*a*f+r*m*f+l*a*y-r*h*y,A=e*_+n*v+i*x+s*M;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let b=1/A;return t[0]=_*b,t[1]=(m*f*s-h*y*s-m*i*d+n*y*d+h*i*g-n*f*g)*b,t[2]=(a*y*s-m*o*s+m*i*u-n*y*u-a*i*g+n*o*g)*b,t[3]=(h*o*s-a*f*s-h*i*u+n*f*u+a*i*d-n*o*d)*b,t[4]=v*b,t[5]=(l*y*s-p*f*s+p*i*d-e*y*d-l*i*g+e*f*g)*b,t[6]=(p*o*s-r*y*s-p*i*u+e*y*u+r*i*g-e*o*g)*b,t[7]=(r*f*s-l*o*s+l*i*u-e*f*u-r*i*d+e*o*d)*b,t[8]=x*b,t[9]=(p*h*s-l*m*s-p*n*d+e*m*d+l*n*g-e*h*g)*b,t[10]=(r*m*s-p*a*s+p*n*u-e*m*u-r*n*g+e*a*g)*b,t[11]=(l*a*s-r*h*s-l*n*u+e*h*u+r*n*d-e*a*d)*b,t[12]=M*b,t[13]=(l*m*i-p*h*i+p*n*f-e*m*f-l*n*y+e*h*y)*b,t[14]=(p*a*i-r*m*i-p*n*o+e*m*o+r*n*y-e*a*y)*b,t[15]=(r*h*i-l*a*i+l*n*o-e*h*o-r*n*f+e*a*f)*b,this}scale(t){let e=this.elements,n=t.x,i=t.y,s=t.z;return e[0]*=n,e[4]*=i,e[8]*=s,e[1]*=n,e[5]*=i,e[9]*=s,e[2]*=n,e[6]*=i,e[10]*=s,e[3]*=n,e[7]*=i,e[11]*=s,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),i=Math.sin(e),s=1-n,r=t.x,a=t.y,o=t.z,u=s*r,l=s*a;return this.set(u*r+n,u*a-i*o,u*o+i*a,0,u*a+i*o,l*a+n,l*o-i*r,0,u*o-i*a,l*o+i*r,s*o*o+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,s,r){return this.set(1,n,s,0,t,1,r,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){let i=this.elements,s=e._x,r=e._y,a=e._z,o=e._w,u=s+s,l=r+r,h=a+a,f=s*u,d=s*l,p=s*h,m=r*l,y=r*h,g=a*h,_=o*u,v=o*l,x=o*h,M=n.x,A=n.y,b=n.z;return i[0]=(1-(m+g))*M,i[1]=(d+x)*M,i[2]=(p-v)*M,i[3]=0,i[4]=(d-x)*A,i[5]=(1-(f+g))*A,i[6]=(y+_)*A,i[7]=0,i[8]=(p+v)*b,i[9]=(y-_)*b,i[10]=(1-(f+m))*b,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){let i=this.elements,s=Ne.set(i[0],i[1],i[2]).length(),r=Ne.set(i[4],i[5],i[6]).length(),a=Ne.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),t.x=i[12],t.y=i[13],t.z=i[14],Et.copy(this);let u=1/s,l=1/r,h=1/a;return Et.elements[0]*=u,Et.elements[1]*=u,Et.elements[2]*=u,Et.elements[4]*=l,Et.elements[5]*=l,Et.elements[6]*=l,Et.elements[8]*=h,Et.elements[9]*=h,Et.elements[10]*=h,e.setFromRotationMatrix(Et),n.x=s,n.y=r,n.z=a,this}makePerspective(t,e,n,i,s,r,a=mn){let o=this.elements,u=2*s/(e-t),l=2*s/(n-i),h=(e+t)/(e-t),f=(n+i)/(n-i),d,p;if(a===mn)d=-(r+s)/(r-s),p=-2*r*s/(r-s);else if(a===Xs)d=-r/(r-s),p=-r*s/(r-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return o[0]=u,o[4]=0,o[8]=h,o[12]=0,o[1]=0,o[5]=l,o[9]=f,o[13]=0,o[2]=0,o[6]=0,o[10]=d,o[14]=p,o[3]=0,o[7]=0,o[11]=-1,o[15]=0,this}makeOrthographic(t,e,n,i,s,r,a=mn){let o=this.elements,u=1/(e-t),l=1/(n-i),h=1/(r-s),f=(e+t)*u,d=(n+i)*l,p,m;if(a===mn)p=(r+s)*h,m=-2*h;else if(a===Xs)p=s*h,m=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return o[0]=2*u,o[4]=0,o[8]=0,o[12]=-f,o[1]=0,o[5]=2*l,o[9]=0,o[13]=-d,o[2]=0,o[6]=0,o[10]=m,o[14]=-p,o[3]=0,o[7]=0,o[11]=0,o[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},Ne=new S,Et=new V,ic=new S(0,0,0),sc=new S(1,1,1),te=new S,Hn=new S,mt=new S,eo=new V,no=new kt,Ge=class c{constructor(t=0,e=0,n=0,i=c.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let i=t.elements,s=i[0],r=i[4],a=i[8],o=i[1],u=i[5],l=i[9],h=i[2],f=i[6],d=i[10];switch(e){case"XYZ":this._y=Math.asin(F(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-l,d),this._z=Math.atan2(-r,s)):(this._x=Math.atan2(f,u),this._z=0);break;case"YXZ":this._x=Math.asin(-F(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(o,u)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(F(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,d),this._z=Math.atan2(-r,u)):(this._y=0,this._z=Math.atan2(o,s));break;case"ZYX":this._y=Math.asin(-F(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(o,s)):(this._x=0,this._z=Math.atan2(-r,u));break;case"YZX":this._z=Math.asin(F(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,u),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-F(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(f,u),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-l,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return eo.makeRotationFromQuaternion(t),this.setFromRotationMatrix(eo,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return no.setFromEuler(this),this.setFromQuaternion(no,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Ge.DEFAULT_ORDER="XYZ";var oi=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},rc=0,io=new S,Fe=new kt,Bt=new V,Gn=new S,fn=new S,oc=new S,ac=new kt,so=new S(1,0,0),ro=new S(0,1,0),oo=new S(0,0,1),ao={type:"added"},cc={type:"removed"},Be={type:"childadded",child:null},vs={type:"childremoved",child:null},ne=class c extends xe{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:rc++}),this.uuid=Sn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=c.DEFAULT_UP.clone();let t=new S,e=new Ge,n=new kt,i=new S(1,1,1);function s(){n.setFromEuler(e,!1)}function r(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new V},normalMatrix:{value:new U}}),this.matrix=new V,this.matrixWorld=new V,this.matrixAutoUpdate=c.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=c.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new oi,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Fe.setFromAxisAngle(t,e),this.quaternion.multiply(Fe),this}rotateOnWorldAxis(t,e){return Fe.setFromAxisAngle(t,e),this.quaternion.premultiply(Fe),this}rotateX(t){return this.rotateOnAxis(so,t)}rotateY(t){return this.rotateOnAxis(ro,t)}rotateZ(t){return this.rotateOnAxis(oo,t)}translateOnAxis(t,e){return io.copy(t).applyQuaternion(this.quaternion),this.position.add(io.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(so,t)}translateY(t){return this.translateOnAxis(ro,t)}translateZ(t){return this.translateOnAxis(oo,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Bt.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Gn.copy(t):Gn.set(t,e,n);let i=this.parent;this.updateWorldMatrix(!0,!1),fn.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Bt.lookAt(fn,Gn,this.up):Bt.lookAt(Gn,fn,this.up),this.quaternion.setFromRotationMatrix(Bt),i&&(Bt.extractRotation(i.matrixWorld),Fe.setFromRotationMatrix(Bt),this.quaternion.premultiply(Fe.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(ao),Be.child=t,this.dispatchEvent(Be),Be.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(cc),vs.child=t,this.dispatchEvent(vs),vs.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Bt.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Bt.multiply(t.parent.matrixWorld)),t.applyMatrix4(Bt),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(ao),Be.child=t,this.dispatchEvent(Be),Be.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){let r=this.children[n].getObjectByProperty(t,e);if(r!==void 0)return r}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let i=this.children;for(let s=0,r=i.length;s<r;s++)i[s].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(fn,t,oc),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(fn,ac,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let i=this.children;for(let s=0,r=i.length;s<r;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function s(a,o){return a[o.uuid]===void 0&&(a[o.uuid]=o.toJSON(t)),o.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let o=a.shapes;if(Array.isArray(o))for(let u=0,l=o.length;u<l;u++){let h=o[u];s(t.shapes,h)}else s(t.shapes,o)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let o=0,u=this.material.length;o<u;o++)a.push(s(t.materials,this.material[o]));i.material=a}else i.material=s(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){let o=this.animations[a];i.animations.push(s(t.animations,o))}}if(e){let a=r(t.geometries),o=r(t.materials),u=r(t.textures),l=r(t.images),h=r(t.shapes),f=r(t.skeletons),d=r(t.animations),p=r(t.nodes);a.length>0&&(n.geometries=a),o.length>0&&(n.materials=o),u.length>0&&(n.textures=u),l.length>0&&(n.images=l),h.length>0&&(n.shapes=h),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),p.length>0&&(n.nodes=p)}return n.object=i,n;function r(a){let o=[];for(let u in a){let l=a[u];delete l.metadata,o.push(l)}return o}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let i=t.children[n];this.add(i.clone())}return this}};ne.DEFAULT_UP=new S(0,1,0);ne.DEFAULT_MATRIX_AUTO_UPDATE=!0;ne.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var wt=new S,Ot=new S,Ms=new S,zt=new S,Oe=new S,ze=new S,co=new S,Ss=new S,bs=new S,Ts=new S,As=new ut,Es=new ut,ws=new ut,X=class c{constructor(t=new S,e=new S,n=new S){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),wt.subVectors(t,e),i.cross(wt);let s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(t,e,n,i,s){wt.subVectors(i,e),Ot.subVectors(n,e),Ms.subVectors(t,e);let r=wt.dot(wt),a=wt.dot(Ot),o=wt.dot(Ms),u=Ot.dot(Ot),l=Ot.dot(Ms),h=r*u-a*a;if(h===0)return s.set(0,0,0),null;let f=1/h,d=(u*o-a*l)*f,p=(r*l-a*o)*f;return s.set(1-d-p,p,d)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,zt)===null?!1:zt.x>=0&&zt.y>=0&&zt.x+zt.y<=1}static getInterpolation(t,e,n,i,s,r,a,o){return this.getBarycoord(t,e,n,i,zt)===null?(o.x=0,o.y=0,"z"in o&&(o.z=0),"w"in o&&(o.w=0),null):(o.setScalar(0),o.addScaledVector(s,zt.x),o.addScaledVector(r,zt.y),o.addScaledVector(a,zt.z),o)}static getInterpolatedAttribute(t,e,n,i,s,r){return As.setScalar(0),Es.setScalar(0),ws.setScalar(0),As.fromBufferAttribute(t,e),Es.fromBufferAttribute(t,n),ws.fromBufferAttribute(t,i),r.setScalar(0),r.addScaledVector(As,s.x),r.addScaledVector(Es,s.y),r.addScaledVector(ws,s.z),r}static isFrontFacing(t,e,n,i){return wt.subVectors(n,e),Ot.subVectors(t,e),wt.cross(Ot).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return wt.subVectors(this.c,this.b),Ot.subVectors(this.a,this.b),wt.cross(Ot).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return c.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return c.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,s){return c.getInterpolation(t,this.a,this.b,this.c,e,n,i,s)}containsPoint(t){return c.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return c.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,i=this.b,s=this.c,r,a;Oe.subVectors(i,n),ze.subVectors(s,n),Ss.subVectors(t,n);let o=Oe.dot(Ss),u=ze.dot(Ss);if(o<=0&&u<=0)return e.copy(n);bs.subVectors(t,i);let l=Oe.dot(bs),h=ze.dot(bs);if(l>=0&&h<=l)return e.copy(i);let f=o*h-l*u;if(f<=0&&o>=0&&l<=0)return r=o/(o-l),e.copy(n).addScaledVector(Oe,r);Ts.subVectors(t,s);let d=Oe.dot(Ts),p=ze.dot(Ts);if(p>=0&&d<=p)return e.copy(s);let m=d*u-o*p;if(m<=0&&u>=0&&p<=0)return a=u/(u-p),e.copy(n).addScaledVector(ze,a);let y=l*p-d*h;if(y<=0&&h-l>=0&&d-p>=0)return co.subVectors(s,i),a=(h-l)/(h-l+(d-p)),e.copy(i).addScaledVector(co,a);let g=1/(y+m+f);return r=m*g,a=f*g,e.copy(n).addScaledVector(Oe,r).addScaledVector(ze,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Mo={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ee={h:0,s:0,l:0},Wn={h:0,s:0,l:0};function Cs(c,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?c+(t-c)*6*e:e<1/2?t:e<2/3?c+(t-c)*6*(2/3-e):c}var et=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=vt){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,yt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=yt.workingColorSpace){return this.r=t,this.g=e,this.b=n,yt.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=yt.workingColorSpace){if(t=Qa(t,1),e=F(e,0,1),n=F(n,0,1),e===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+e):n+e-n*e,r=2*n-s;this.r=Cs(r,s,t+1/3),this.g=Cs(r,s,t),this.b=Cs(r,s,t-1/3)}return yt.toWorkingColorSpace(this,i),this}setStyle(t,e=vt){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let s,r=i[1],a=i[2];switch(r){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){let s=i[1],r=s.length;if(r===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(r===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=vt){let n=Mo[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Vt(t.r),this.g=Vt(t.g),this.b=Vt(t.b),this}copyLinearToSRGB(t){return this.r=ke(t.r),this.g=ke(t.g),this.b=ke(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=vt){return yt.fromWorkingColorSpace(ct.copy(this),t),Math.round(F(ct.r*255,0,255))*65536+Math.round(F(ct.g*255,0,255))*256+Math.round(F(ct.b*255,0,255))}getHexString(t=vt){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=yt.workingColorSpace){yt.fromWorkingColorSpace(ct.copy(this),e);let n=ct.r,i=ct.g,s=ct.b,r=Math.max(n,i,s),a=Math.min(n,i,s),o,u,l=(a+r)/2;if(a===r)o=0,u=0;else{let h=r-a;switch(u=l<=.5?h/(r+a):h/(2-r-a),r){case n:o=(i-s)/h+(i<s?6:0);break;case i:o=(s-n)/h+2;break;case s:o=(n-i)/h+4;break}o/=6}return t.h=o,t.s=u,t.l=l,t}getRGB(t,e=yt.workingColorSpace){return yt.fromWorkingColorSpace(ct.copy(this),e),t.r=ct.r,t.g=ct.g,t.b=ct.b,t}getStyle(t=vt){yt.fromWorkingColorSpace(ct.copy(this),t);let e=ct.r,n=ct.g,i=ct.b;return t!==vt?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(ee),this.setHSL(ee.h+t,ee.s+e,ee.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(ee),t.getHSL(Wn);let n=hs(ee.h,Wn.h,e),i=hs(ee.s,Wn.s,e),s=hs(ee.l,Wn.l,e);return this.setHSL(n,i,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,i=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*i,this.g=s[1]*e+s[4]*n+s[7]*i,this.b=s[2]*e+s[5]*n+s[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},ct=new et;et.NAMES=Mo;var lc=0,ai=class extends xe{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:lc++}),this.uuid=Sn(),this.name="",this.type="Material",this.blending=Ls,this.side=_e,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Us,this.blendDst=Ns,this.blendEquation=Ds,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new et(0,0,0),this.blendAlpha=0,this.depthFunc=gn,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Gs,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=me,this.stencilZFail=me,this.stencilZPass=me,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ls&&(n.blending=this.blending),this.side!==_e&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Us&&(n.blendSrc=this.blendSrc),this.blendDst!==Ns&&(n.blendDst=this.blendDst),this.blendEquation!==Ds&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==gn&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Gs&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==me&&(n.stencilFail=this.stencilFail),this.stencilZFail!==me&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==me&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){let r=[];for(let a in s){let o=s[a];delete o.metadata,r.push(o)}return r}if(e){let s=i(t.textures),r=i(t.images);s.length>0&&(n.textures=s),r.length>0&&(n.images=r)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let i=e.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},ci=class extends ai{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new et(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ge,this.combine=po,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var tt=new S,Xn=new G,Q=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Ws,this.updateRanges=[],this.gpuType=xo,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Xn.fromBufferAttribute(this,e),Xn.applyMatrix3(t),this.setXY(e,Xn.x,Xn.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)tt.fromBufferAttribute(this,e),tt.applyMatrix3(t),this.setXYZ(e,tt.x,tt.y,tt.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)tt.fromBufferAttribute(this,e),tt.applyMatrix4(t),this.setXYZ(e,tt.x,tt.y,tt.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)tt.fromBufferAttribute(this,e),tt.applyNormalMatrix(t),this.setXYZ(e,tt.x,tt.y,tt.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)tt.fromBufferAttribute(this,e),tt.transformDirection(t),this.setXYZ(e,tt.x,tt.y,tt.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=ln(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=pt(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=ln(e,this.array)),e}setX(t,e){return this.normalized&&(e=pt(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=ln(e,this.array)),e}setY(t,e){return this.normalized&&(e=pt(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=ln(e,this.array)),e}setZ(t,e){return this.normalized&&(e=pt(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=ln(e,this.array)),e}setW(t,e){return this.normalized&&(e=pt(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=pt(e,this.array),n=pt(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=pt(e,this.array),n=pt(n,this.array),i=pt(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t*=this.itemSize,this.normalized&&(e=pt(e,this.array),n=pt(n,this.array),i=pt(i,this.array),s=pt(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Ws&&(t.usage=this.usage),t}};var li=class extends Q{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var ui=class extends Q{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var ge=class extends Q{constructor(t,e,n){super(new Float32Array(t),e,n)}},uc=0,xt=new V,Rs=new ne,Ve=new S,gt=new J,dn=new J,rt=new S,ye=class c extends xe{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:uc++}),this.uuid=Sn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(vo(t)?ui:li)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new U().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return xt.makeRotationFromQuaternion(t),this.applyMatrix4(xt),this}rotateX(t){return xt.makeRotationX(t),this.applyMatrix4(xt),this}rotateY(t){return xt.makeRotationY(t),this.applyMatrix4(xt),this}rotateZ(t){return xt.makeRotationZ(t),this.applyMatrix4(xt),this}translate(t,e,n){return xt.makeTranslation(t,e,n),this.applyMatrix4(xt),this}scale(t,e,n){return xt.makeScale(t,e,n),this.applyMatrix4(xt),this}lookAt(t){return Rs.lookAt(t),Rs.updateMatrix(),this.applyMatrix4(Rs.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ve).negate(),this.translate(Ve.x,Ve.y,Ve.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let i=0,s=t.length;i<s;i++){let r=t[i];n.push(r.x,r.y,r.z||0)}this.setAttribute("position",new ge(n,3))}else{let n=Math.min(t.length,e.count);for(let i=0;i<n;i++){let s=t[i];e.setXYZ(i,s.x,s.y,s.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new J);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new S(-1/0,-1/0,-1/0),new S(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){let s=e[n];gt.setFromBufferAttribute(s),this.morphTargetsRelative?(rt.addVectors(this.boundingBox.min,gt.min),this.boundingBox.expandByPoint(rt),rt.addVectors(this.boundingBox.max,gt.max),this.boundingBox.expandByPoint(rt)):(this.boundingBox.expandByPoint(gt.min),this.boundingBox.expandByPoint(gt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new xn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new S,1/0);return}if(t){let n=this.boundingSphere.center;if(gt.setFromBufferAttribute(t),e)for(let s=0,r=e.length;s<r;s++){let a=e[s];dn.setFromBufferAttribute(a),this.morphTargetsRelative?(rt.addVectors(gt.min,dn.min),gt.expandByPoint(rt),rt.addVectors(gt.max,dn.max),gt.expandByPoint(rt)):(gt.expandByPoint(dn.min),gt.expandByPoint(dn.max))}gt.getCenter(n);let i=0;for(let s=0,r=t.count;s<r;s++)rt.fromBufferAttribute(t,s),i=Math.max(i,n.distanceToSquared(rt));if(e)for(let s=0,r=e.length;s<r;s++){let a=e[s],o=this.morphTargetsRelative;for(let u=0,l=a.count;u<l;u++)rt.fromBufferAttribute(a,u),o&&(Ve.fromBufferAttribute(t,u),rt.add(Ve)),i=Math.max(i,n.distanceToSquared(rt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,i=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Q(new Float32Array(4*n.count),4));let r=this.getAttribute("tangent"),a=[],o=[];for(let T=0;T<n.count;T++)a[T]=new S,o[T]=new S;let u=new S,l=new S,h=new S,f=new G,d=new G,p=new G,m=new S,y=new S;function g(T,C,E){u.fromBufferAttribute(n,T),l.fromBufferAttribute(n,C),h.fromBufferAttribute(n,E),f.fromBufferAttribute(s,T),d.fromBufferAttribute(s,C),p.fromBufferAttribute(s,E),l.sub(u),h.sub(u),d.sub(f),p.sub(f);let I=1/(d.x*p.y-p.x*d.y);isFinite(I)&&(m.copy(l).multiplyScalar(p.y).addScaledVector(h,-d.y).multiplyScalar(I),y.copy(h).multiplyScalar(d.x).addScaledVector(l,-p.x).multiplyScalar(I),a[T].add(m),a[C].add(m),a[E].add(m),o[T].add(y),o[C].add(y),o[E].add(y))}let _=this.groups;_.length===0&&(_=[{start:0,count:t.count}]);for(let T=0,C=_.length;T<C;++T){let E=_[T],I=E.start,w=E.count;for(let R=I,P=I+w;R<P;R+=3)g(t.getX(R+0),t.getX(R+1),t.getX(R+2))}let v=new S,x=new S,M=new S,A=new S;function b(T){M.fromBufferAttribute(i,T),A.copy(M);let C=a[T];v.copy(C),v.sub(M.multiplyScalar(M.dot(C))).normalize(),x.crossVectors(A,C);let I=x.dot(o[T])<0?-1:1;r.setXYZW(T,v.x,v.y,v.z,I)}for(let T=0,C=_.length;T<C;++T){let E=_[T],I=E.start,w=E.count;for(let R=I,P=I+w;R<P;R+=3)b(t.getX(R+0)),b(t.getX(R+1)),b(t.getX(R+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Q(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);let i=new S,s=new S,r=new S,a=new S,o=new S,u=new S,l=new S,h=new S;if(t)for(let f=0,d=t.count;f<d;f+=3){let p=t.getX(f+0),m=t.getX(f+1),y=t.getX(f+2);i.fromBufferAttribute(e,p),s.fromBufferAttribute(e,m),r.fromBufferAttribute(e,y),l.subVectors(r,s),h.subVectors(i,s),l.cross(h),a.fromBufferAttribute(n,p),o.fromBufferAttribute(n,m),u.fromBufferAttribute(n,y),a.add(l),o.add(l),u.add(l),n.setXYZ(p,a.x,a.y,a.z),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(y,u.x,u.y,u.z)}else for(let f=0,d=e.count;f<d;f+=3)i.fromBufferAttribute(e,f+0),s.fromBufferAttribute(e,f+1),r.fromBufferAttribute(e,f+2),l.subVectors(r,s),h.subVectors(i,s),l.cross(h),n.setXYZ(f+0,l.x,l.y,l.z),n.setXYZ(f+1,l.x,l.y,l.z),n.setXYZ(f+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)rt.fromBufferAttribute(t,e),rt.normalize(),t.setXYZ(e,rt.x,rt.y,rt.z)}toNonIndexed(){function t(a,o){let u=a.array,l=a.itemSize,h=a.normalized,f=new u.constructor(o.length*l),d=0,p=0;for(let m=0,y=o.length;m<y;m++){a.isInterleavedBufferAttribute?d=o[m]*a.data.stride+a.offset:d=o[m]*l;for(let g=0;g<l;g++)f[p++]=u[d++]}return new Q(f,l,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new c,n=this.index.array,i=this.attributes;for(let a in i){let o=i[a],u=t(o,n);e.setAttribute(a,u)}let s=this.morphAttributes;for(let a in s){let o=[],u=s[a];for(let l=0,h=u.length;l<h;l++){let f=u[l],d=t(f,n);o.push(d)}e.morphAttributes[a]=o}e.morphTargetsRelative=this.morphTargetsRelative;let r=this.groups;for(let a=0,o=r.length;a<o;a++){let u=r[a];e.addGroup(u.start,u.count,u.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let o=this.parameters;for(let u in o)o[u]!==void 0&&(t[u]=o[u]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let o in n){let u=n[o];t.data.attributes[o]=u.toJSON(t.data)}let i={},s=!1;for(let o in this.morphAttributes){let u=this.morphAttributes[o],l=[];for(let h=0,f=u.length;h<f;h++){let d=u[h];l.push(d.toJSON(t.data))}l.length>0&&(i[o]=l,s=!0)}s&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);let r=this.groups;r.length>0&&(t.data.groups=JSON.parse(JSON.stringify(r)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone(e));let i=t.attributes;for(let u in i){let l=i[u];this.setAttribute(u,l.clone(e))}let s=t.morphAttributes;for(let u in s){let l=[],h=s[u];for(let f=0,d=h.length;f<d;f++)l.push(h[f].clone(e));this.morphAttributes[u]=l}this.morphTargetsRelative=t.morphTargetsRelative;let r=t.groups;for(let u=0,l=r.length;u<l;u++){let h=r[u];this.addGroup(h.start,h.count,h.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let o=t.boundingSphere;return o!==null&&(this.boundingSphere=o.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},lo=new V,pe=new Lt,qn=new xn,uo=new S,Yn=new S,Zn=new S,$n=new S,Is=new S,Jn=new S,ho=new S,Kn=new S,yn=class extends ne{constructor(t=new ye,e=new ci){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=i.length;s<r;s++){let a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(t,e){let n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,r=n.morphTargetsRelative;e.fromBufferAttribute(i,t);let a=this.morphTargetInfluences;if(s&&a){Jn.set(0,0,0);for(let o=0,u=s.length;o<u;o++){let l=a[o],h=s[o];l!==0&&(Is.fromBufferAttribute(h,t),r?Jn.addScaledVector(Is,l):Jn.addScaledVector(Is.sub(e),l))}e.add(Jn)}return e}raycast(t,e){let n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),qn.copy(n.boundingSphere),qn.applyMatrix4(s),pe.copy(t.ray).recast(t.near),!(qn.containsPoint(pe.origin)===!1&&(pe.intersectSphere(qn,uo)===null||pe.origin.distanceToSquared(uo)>(t.far-t.near)**2))&&(lo.copy(s).invert(),pe.copy(t.ray).applyMatrix4(lo),!(n.boundingBox!==null&&pe.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,pe)))}_computeIntersections(t,e,n){let i,s=this.geometry,r=this.material,a=s.index,o=s.attributes.position,u=s.attributes.uv,l=s.attributes.uv1,h=s.attributes.normal,f=s.groups,d=s.drawRange;if(a!==null)if(Array.isArray(r))for(let p=0,m=f.length;p<m;p++){let y=f[p],g=r[y.materialIndex],_=Math.max(y.start,d.start),v=Math.min(a.count,Math.min(y.start+y.count,d.start+d.count));for(let x=_,M=v;x<M;x+=3){let A=a.getX(x),b=a.getX(x+1),T=a.getX(x+2);i=Qn(this,g,t,n,u,l,h,A,b,T),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=y.materialIndex,e.push(i))}}else{let p=Math.max(0,d.start),m=Math.min(a.count,d.start+d.count);for(let y=p,g=m;y<g;y+=3){let _=a.getX(y),v=a.getX(y+1),x=a.getX(y+2);i=Qn(this,r,t,n,u,l,h,_,v,x),i&&(i.faceIndex=Math.floor(y/3),e.push(i))}}else if(o!==void 0)if(Array.isArray(r))for(let p=0,m=f.length;p<m;p++){let y=f[p],g=r[y.materialIndex],_=Math.max(y.start,d.start),v=Math.min(o.count,Math.min(y.start+y.count,d.start+d.count));for(let x=_,M=v;x<M;x+=3){let A=x,b=x+1,T=x+2;i=Qn(this,g,t,n,u,l,h,A,b,T),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=y.materialIndex,e.push(i))}}else{let p=Math.max(0,d.start),m=Math.min(o.count,d.start+d.count);for(let y=p,g=m;y<g;y+=3){let _=y,v=y+1,x=y+2;i=Qn(this,r,t,n,u,l,h,_,v,x),i&&(i.faceIndex=Math.floor(y/3),e.push(i))}}}};function hc(c,t,e,n,i,s,r,a){let o;if(t.side===vi?o=n.intersectTriangle(r,s,i,!0,a):o=n.intersectTriangle(i,s,r,t.side===_e,a),o===null)return null;Kn.copy(a),Kn.applyMatrix4(c.matrixWorld);let u=e.ray.origin.distanceTo(Kn);return u<e.near||u>e.far?null:{distance:u,point:Kn.clone(),object:c}}function Qn(c,t,e,n,i,s,r,a,o,u){c.getVertexPosition(a,Yn),c.getVertexPosition(o,Zn),c.getVertexPosition(u,$n);let l=hc(c,t,e,n,Yn,Zn,$n,ho);if(l){let h=new S;X.getBarycoord(ho,Yn,Zn,$n,h),i&&(l.uv=X.getInterpolatedAttribute(i,a,o,u,h,new G)),s&&(l.uv1=X.getInterpolatedAttribute(s,a,o,u,h,new G)),r&&(l.normal=X.getInterpolatedAttribute(r,a,o,u,h,new S),l.normal.dot(n.direction)>0&&l.normal.multiplyScalar(-1));let f={a,b:o,c:u,normal:new S,materialIndex:0};X.getNormal(Yn,Zn,$n,f.normal),l.face=f,l.barycoord=h}return l}function So(c){let t={};for(let e in c){t[e]={};for(let n in c[e]){let i=c[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function ht(c){let t={};for(let e=0;e<c.length;e++){let n=So(c[e]);for(let i in n)t[i]=n[i]}return t}var Ps=new S,fc=new S,dc=new U,Ht=class{constructor(t=new S(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let i=Ps.subVectors(n,e).cross(fc.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(Ps),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let s=-(t.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:e.copy(t.start).addScaledVector(n,s)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||dc.getNormalMatrix(t),i=this.coplanarPoint(Ps).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}};var vn=class c extends ye{constructor(t=1,e=32,n=16,i=0,s=Math.PI*2,r=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:s,thetaStart:r,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let o=Math.min(r+a,Math.PI),u=0,l=[],h=new S,f=new S,d=[],p=[],m=[],y=[];for(let g=0;g<=n;g++){let _=[],v=g/n,x=0;g===0&&r===0?x=.5/e:g===n&&o===Math.PI&&(x=-.5/e);for(let M=0;M<=e;M++){let A=M/e;h.x=-t*Math.cos(i+A*s)*Math.sin(r+v*a),h.y=t*Math.cos(r+v*a),h.z=t*Math.sin(i+A*s)*Math.sin(r+v*a),p.push(h.x,h.y,h.z),f.copy(h).normalize(),m.push(f.x,f.y,f.z),y.push(A+x,1-v),_.push(u++)}l.push(_)}for(let g=0;g<n;g++)for(let _=0;_<e;_++){let v=l[g][_+1],x=l[g][_],M=l[g+1][_],A=l[g+1][_+1];(g!==0||r>0)&&d.push(v,x,A),(g!==n-1||o<Math.PI)&&d.push(x,M,A)}this.setIndex(d),this.setAttribute("position",new ge(p,3)),this.setAttribute("normal",new ge(m,3)),this.setAttribute("uv",new ge(y,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new c(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};function jn(c,t,e){return!c||!e&&c.constructor===t?c:typeof t.BYTES_PER_ELEMENT=="number"?new t(c):Array.prototype.slice.call(c)}function pc(c){return ArrayBuffer.isView(c)&&!(c instanceof DataView)}var ve=class{constructor(t,e,n,i){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,i=e[n],s=e[n-1];n:{t:{let r;e:{i:if(!(t<i)){for(let a=n+2;;){if(i===void 0){if(t<s)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(s=i,i=e[++n],t<i)break t}r=e.length;break e}if(!(t>=s)){let a=e[1];t<a&&(n=2,s=a);for(let o=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===o)break;if(i=s,s=e[--n-1],t>=s)break t}r=n,n=0;break e}break n}for(;n<r;){let a=n+r>>>1;t<e[a]?r=a:n=a+1}if(i=e[n],s=e[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,t,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=t*i;for(let r=0;r!==i;++r)e[r]=n[s+r];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},hi=class extends ve{constructor(t,e,n,i){super(t,e,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Os,endingEnd:Os}}intervalChanged_(t,e,n){let i=this.parameterPositions,s=t-2,r=t+1,a=i[s],o=i[r];if(a===void 0)switch(this.getSettings_().endingStart){case zs:s=t,a=2*e-n;break;case Vs:s=i.length-2,a=e+i[s]-i[s+1];break;default:s=t,a=n}if(o===void 0)switch(this.getSettings_().endingEnd){case zs:r=t,o=2*n-e;break;case Vs:r=1,o=n+i[1]-i[0];break;default:r=t-1,o=e}let u=(n-e)*.5,l=this.valueSize;this._weightPrev=u/(e-a),this._weightNext=u/(o-n),this._offsetPrev=s*l,this._offsetNext=r*l}interpolate_(t,e,n,i){let s=this.resultBuffer,r=this.sampleValues,a=this.valueSize,o=t*a,u=o-a,l=this._offsetPrev,h=this._offsetNext,f=this._weightPrev,d=this._weightNext,p=(n-e)/(i-e),m=p*p,y=m*p,g=-f*y+2*f*m-f*p,_=(1+f)*y+(-1.5-2*f)*m+(-.5+f)*p+1,v=(-1-d)*y+(1.5+d)*m+.5*p,x=d*y-d*m;for(let M=0;M!==a;++M)s[M]=g*r[l+M]+_*r[u+M]+v*r[o+M]+x*r[h+M];return s}},fi=class extends ve{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let s=this.resultBuffer,r=this.sampleValues,a=this.valueSize,o=t*a,u=o-a,l=(n-e)/(i-e),h=1-l;for(let f=0;f!==a;++f)s[f]=r[u+f]*h+r[o+f]*l;return s}},di=class extends ve{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t){return this.copySampleValue_(t-1)}},Mt=class{constructor(t,e,n,i){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=jn(e,this.TimeBufferType),this.values=jn(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:jn(t.times,Array),values:jn(t.values,Array)};let i=t.getInterpolation();i!==t.DefaultInterpolation&&(n.interpolation=i)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new di(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new fi(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new hi(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case _n:e=this.InterpolantFactoryMethodDiscrete;break;case ii:e=this.InterpolantFactoryMethodLinear;break;case ei:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return _n;case this.InterpolantFactoryMethodLinear:return ii;case this.InterpolantFactoryMethodSmooth:return ei}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]*=t}return this}trim(t,e){let n=this.times,i=n.length,s=0,r=i-1;for(;s!==i&&n[s]<t;)++s;for(;r!==-1&&n[r]>e;)--r;if(++r,s!==0||r!==i){s>=r&&(r=Math.max(r,1),s=r-1);let a=this.getValueSize();this.times=n.slice(s,r),this.values=this.values.slice(s*a,r*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let r=null;for(let a=0;a!==s;a++){let o=n[a];if(typeof o=="number"&&isNaN(o)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,o),t=!1;break}if(r!==null&&r>o){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,o,r),t=!1;break}r=o}if(i!==void 0&&pc(i))for(let a=0,o=i.length;a!==o;++a){let u=i[a];if(isNaN(u)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,u),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===ei,s=t.length-1,r=1;for(let a=1;a<s;++a){let o=!1,u=t[a],l=t[a+1];if(u!==l&&(a!==1||u!==t[0]))if(i)o=!0;else{let h=a*n,f=h-n,d=h+n;for(let p=0;p!==n;++p){let m=e[h+p];if(m!==e[f+p]||m!==e[d+p]){o=!0;break}}}if(o){if(a!==r){t[r]=t[a];let h=a*n,f=r*n;for(let d=0;d!==n;++d)e[f+d]=e[h+d]}++r}}if(s>0){t[r]=t[s];for(let a=s*n,o=r*n,u=0;u!==n;++u)e[o+u]=e[a+u];++r}return r!==t.length?(this.times=t.slice(0,r),this.values=e.slice(0,r*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,i=new n(this.name,t,e);return i.createInterpolant=this.createInterpolant,i}};Mt.prototype.TimeBufferType=Float32Array;Mt.prototype.ValueBufferType=Float32Array;Mt.prototype.DefaultInterpolation=ii;var ie=class extends Mt{constructor(t,e,n){super(t,e,n)}};ie.prototype.ValueTypeName="bool";ie.prototype.ValueBufferType=Array;ie.prototype.DefaultInterpolation=_n;ie.prototype.InterpolantFactoryMethodLinear=void 0;ie.prototype.InterpolantFactoryMethodSmooth=void 0;var pi=class extends Mt{};pi.prototype.ValueTypeName="color";var mi=class extends Mt{};mi.prototype.ValueTypeName="number";var gi=class extends ve{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let s=this.resultBuffer,r=this.sampleValues,a=this.valueSize,o=(n-e)/(i-e),u=t*a;for(let l=u+a;u!==l;u+=4)kt.slerpFlat(s,0,r,u-a,r,u,o);return s}},Mn=class extends Mt{InterpolantFactoryMethodLinear(t){return new gi(this.times,this.values,this.getValueSize(),t)}};Mn.prototype.ValueTypeName="quaternion";Mn.prototype.InterpolantFactoryMethodSmooth=void 0;var se=class extends Mt{constructor(t,e,n){super(t,e,n)}};se.prototype.ValueTypeName="string";se.prototype.ValueBufferType=Array;se.prototype.DefaultInterpolation=_n;se.prototype.InterpolantFactoryMethodLinear=void 0;se.prototype.InterpolantFactoryMethodSmooth=void 0;var _i=class extends Mt{};_i.prototype.ValueTypeName="vector";var xi=class{constructor(t,e,n){let i=this,s=!1,r=0,a=0,o,u=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(l){a++,s===!1&&i.onStart!==void 0&&i.onStart(l,r,a),s=!0},this.itemEnd=function(l){r++,i.onProgress!==void 0&&i.onProgress(l,r,a),r===a&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(l){i.onError!==void 0&&i.onError(l)},this.resolveURL=function(l){return o?o(l):l},this.setURLModifier=function(l){return o=l,this},this.addHandler=function(l,h){return u.push(l,h),this},this.removeHandler=function(l){let h=u.indexOf(l);return h!==-1&&u.splice(h,2),this},this.getHandler=function(l){for(let h=0,f=u.length;h<f;h+=2){let d=u[h],p=u[h+1];if(d.global&&(d.lastIndex=0),d.test(l))return p}return null}}},bo=new xi,yi=class{constructor(t){this.manager=t!==void 0?t:bo,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let n=this;return new Promise(function(i,s){n.load(t,i,e,s)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};yi.DEFAULT_MATERIAL_NAME="__DEFAULT";var ir="\\[\\]\\.:\\/",mc=new RegExp("["+ir+"]","g"),sr="[^"+ir+"]",gc="[^"+ir.replace("\\.","")+"]",_c=/((?:WC+[\/:])*)/.source.replace("WC",sr),xc=/(WCOD+)?/.source.replace("WCOD",gc),yc=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",sr),vc=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",sr),Mc=new RegExp("^"+_c+xc+yc+vc+"$"),Sc=["material","materials","bones","map"],Ys=class{constructor(t,e,n){let i=n||$.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,i)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},$=class c{constructor(t,e,n){this.path=e,this.parsedPath=n||c.parseTrackName(e),this.node=c.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new c.Composite(t,e,n):new c(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(mc,"")}static parseTrackName(t){let e=Mc.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let s=n.nodeName.substring(i+1);Sc.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(s){for(let r=0;r<s.length;r++){let a=s[r];if(a.name===e||a.uuid===e)return a;let o=n(a.children);if(o)return o}return null},i=n(t.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)t[e++]=n[i]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,i=e.propertyName,s=e.propertyIndex;if(t||(t=c.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let u=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let l=0;l<t.length;l++)if(t[l].name===u){u=l;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(u!==void 0){if(t[u]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[u]}}let r=t[i];if(r===void 0){let u=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+u+"."+i+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?a=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let o=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[s]!==void 0&&(s=t.morphTargetDictionary[s])}o=this.BindingType.ArrayElement,this.resolvedProperty=r,this.propertyIndex=s}else r.fromArray!==void 0&&r.toArray!==void 0?(o=this.BindingType.HasFromToArray,this.resolvedProperty=r):Array.isArray(r)?(o=this.BindingType.EntireArray,this.resolvedProperty=r):this.propertyName=i;this.getValue=this.GetterByBindingType[o],this.setValue=this.SetterByBindingTypeAndVersioning[o][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};$.Composite=Ys;$.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};$.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};$.prototype.GetterByBindingType=[$.prototype._getValue_direct,$.prototype._getValue_array,$.prototype._getValue_arrayElement,$.prototype._getValue_toArray];$.prototype.SetterByBindingTypeAndVersioning=[[$.prototype._setValue_direct,$.prototype._setValue_direct_setNeedsUpdate,$.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[$.prototype._setValue_array,$.prototype._setValue_array_setNeedsUpdate,$.prototype._setValue_array_setMatrixWorldNeedsUpdate],[$.prototype._setValue_arrayElement,$.prototype._setValue_arrayElement_setNeedsUpdate,$.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[$.prototype._setValue_fromArray,$.prototype._setValue_fromArray_setNeedsUpdate,$.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Zh=new Float32Array(1);var fo=new S,ti=new S,nt=class{constructor(t=new S,e=new S){this.start=t,this.end=e}set(t,e){return this.start.copy(t),this.end.copy(e),this}copy(t){return this.start.copy(t.start),this.end.copy(t.end),this}getCenter(t){return t.addVectors(this.start,this.end).multiplyScalar(.5)}delta(t){return t.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(t,e){return this.delta(e).multiplyScalar(t).add(this.start)}closestPointToPointParameter(t,e){fo.subVectors(t,this.start),ti.subVectors(this.end,this.start);let n=ti.dot(ti),s=ti.dot(fo)/n;return e&&(s=F(s,0,1)),s}closestPointToPoint(t,e,n){let i=this.closestPointToPointParameter(t,e);return this.delta(n).multiplyScalar(i).add(this.start)}applyMatrix4(t){return this.start.applyMatrix4(t),this.end.applyMatrix4(t),this}equals(t){return t.start.equals(this.start)&&t.end.equals(this.end)}clone(){return new this.constructor().copy(this)}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"172"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="172");var bc=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Tc=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Ac=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ec=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,wc=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Cc=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Rc=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Ic=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Pc=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Lc=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Dc=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Uc=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Nc=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Fc=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Bc=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Oc=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,zc=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Vc=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,kc=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Hc=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Gc=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Wc=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Xc=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,qc=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Yc=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Zc=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,$c=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Jc=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Kc=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Qc=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,jc="gl_FragColor = linearToOutputTexel( gl_FragColor );",tl=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,el=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,nl=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,il=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,sl=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,rl=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,ol=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,al=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,cl=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ll=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ul=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,hl=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,fl=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,dl=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,pl=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,ml=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,gl=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,_l=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,xl=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,yl=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,vl=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Ml=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Sl=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,bl=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Tl=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Al=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,El=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,wl=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Cl=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Rl=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Il=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Pl=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Ll=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Dl=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ul=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Nl=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Fl=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Bl=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ol=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,zl=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Vl=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,kl=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Hl=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Gl=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Wl=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Xl=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,ql=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Yl=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Zl=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,$l=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Jl=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Kl=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Ql=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,jl=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,tu=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,eu=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,nu=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,iu=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,su=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,ru=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,ou=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,au=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,cu=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,lu=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,uu=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,hu=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,fu=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,du=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,pu=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,mu=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,gu=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,_u=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,xu=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,yu=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,vu=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Mu=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Su=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,bu=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Tu=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Au=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Eu=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,wu=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Cu=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Ru=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Iu=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Pu=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Lu=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Du=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Uu=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Nu=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Fu=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Bu=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ou=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,zu=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Vu=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,ku=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hu=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Gu=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Wu=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Xu=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qu=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Yu=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Zu=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$u=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ju=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Ku=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Qu=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ju=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,th=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,eh=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,B={alphahash_fragment:bc,alphahash_pars_fragment:Tc,alphamap_fragment:Ac,alphamap_pars_fragment:Ec,alphatest_fragment:wc,alphatest_pars_fragment:Cc,aomap_fragment:Rc,aomap_pars_fragment:Ic,batching_pars_vertex:Pc,batching_vertex:Lc,begin_vertex:Dc,beginnormal_vertex:Uc,bsdfs:Nc,iridescence_fragment:Fc,bumpmap_pars_fragment:Bc,clipping_planes_fragment:Oc,clipping_planes_pars_fragment:zc,clipping_planes_pars_vertex:Vc,clipping_planes_vertex:kc,color_fragment:Hc,color_pars_fragment:Gc,color_pars_vertex:Wc,color_vertex:Xc,common:qc,cube_uv_reflection_fragment:Yc,defaultnormal_vertex:Zc,displacementmap_pars_vertex:$c,displacementmap_vertex:Jc,emissivemap_fragment:Kc,emissivemap_pars_fragment:Qc,colorspace_fragment:jc,colorspace_pars_fragment:tl,envmap_fragment:el,envmap_common_pars_fragment:nl,envmap_pars_fragment:il,envmap_pars_vertex:sl,envmap_physical_pars_fragment:ml,envmap_vertex:rl,fog_vertex:ol,fog_pars_vertex:al,fog_fragment:cl,fog_pars_fragment:ll,gradientmap_pars_fragment:ul,lightmap_pars_fragment:hl,lights_lambert_fragment:fl,lights_lambert_pars_fragment:dl,lights_pars_begin:pl,lights_toon_fragment:gl,lights_toon_pars_fragment:_l,lights_phong_fragment:xl,lights_phong_pars_fragment:yl,lights_physical_fragment:vl,lights_physical_pars_fragment:Ml,lights_fragment_begin:Sl,lights_fragment_maps:bl,lights_fragment_end:Tl,logdepthbuf_fragment:Al,logdepthbuf_pars_fragment:El,logdepthbuf_pars_vertex:wl,logdepthbuf_vertex:Cl,map_fragment:Rl,map_pars_fragment:Il,map_particle_fragment:Pl,map_particle_pars_fragment:Ll,metalnessmap_fragment:Dl,metalnessmap_pars_fragment:Ul,morphinstance_vertex:Nl,morphcolor_vertex:Fl,morphnormal_vertex:Bl,morphtarget_pars_vertex:Ol,morphtarget_vertex:zl,normal_fragment_begin:Vl,normal_fragment_maps:kl,normal_pars_fragment:Hl,normal_pars_vertex:Gl,normal_vertex:Wl,normalmap_pars_fragment:Xl,clearcoat_normal_fragment_begin:ql,clearcoat_normal_fragment_maps:Yl,clearcoat_pars_fragment:Zl,iridescence_pars_fragment:$l,opaque_fragment:Jl,packing:Kl,premultiplied_alpha_fragment:Ql,project_vertex:jl,dithering_fragment:tu,dithering_pars_fragment:eu,roughnessmap_fragment:nu,roughnessmap_pars_fragment:iu,shadowmap_pars_fragment:su,shadowmap_pars_vertex:ru,shadowmap_vertex:ou,shadowmask_pars_fragment:au,skinbase_vertex:cu,skinning_pars_vertex:lu,skinning_vertex:uu,skinnormal_vertex:hu,specularmap_fragment:fu,specularmap_pars_fragment:du,tonemapping_fragment:pu,tonemapping_pars_fragment:mu,transmission_fragment:gu,transmission_pars_fragment:_u,uv_pars_fragment:xu,uv_pars_vertex:yu,uv_vertex:vu,worldpos_vertex:Mu,background_vert:Su,background_frag:bu,backgroundCube_vert:Tu,backgroundCube_frag:Au,cube_vert:Eu,cube_frag:wu,depth_vert:Cu,depth_frag:Ru,distanceRGBA_vert:Iu,distanceRGBA_frag:Pu,equirect_vert:Lu,equirect_frag:Du,linedashed_vert:Uu,linedashed_frag:Nu,meshbasic_vert:Fu,meshbasic_frag:Bu,meshlambert_vert:Ou,meshlambert_frag:zu,meshmatcap_vert:Vu,meshmatcap_frag:ku,meshnormal_vert:Hu,meshnormal_frag:Gu,meshphong_vert:Wu,meshphong_frag:Xu,meshphysical_vert:qu,meshphysical_frag:Yu,meshtoon_vert:Zu,meshtoon_frag:$u,points_vert:Ju,points_frag:Ku,shadow_vert:Qu,shadow_frag:ju,sprite_vert:th,sprite_frag:eh},L={common:{diffuse:{value:new et(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new U},alphaMap:{value:null},alphaMapTransform:{value:new U},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new U}},envmap:{envMap:{value:null},envMapRotation:{value:new U},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new U}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new U}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new U},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new U},normalScale:{value:new G(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new U},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new U}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new U}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new U}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new et(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new et(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new U},alphaTest:{value:0},uvTransform:{value:new U}},sprite:{diffuse:{value:new et(16777215)},opacity:{value:1},center:{value:new G(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new U},alphaMap:{value:null},alphaMapTransform:{value:new U},alphaTest:{value:0}}},To={basic:{uniforms:ht([L.common,L.specularmap,L.envmap,L.aomap,L.lightmap,L.fog]),vertexShader:B.meshbasic_vert,fragmentShader:B.meshbasic_frag},lambert:{uniforms:ht([L.common,L.specularmap,L.envmap,L.aomap,L.lightmap,L.emissivemap,L.bumpmap,L.normalmap,L.displacementmap,L.fog,L.lights,{emissive:{value:new et(0)}}]),vertexShader:B.meshlambert_vert,fragmentShader:B.meshlambert_frag},phong:{uniforms:ht([L.common,L.specularmap,L.envmap,L.aomap,L.lightmap,L.emissivemap,L.bumpmap,L.normalmap,L.displacementmap,L.fog,L.lights,{emissive:{value:new et(0)},specular:{value:new et(1118481)},shininess:{value:30}}]),vertexShader:B.meshphong_vert,fragmentShader:B.meshphong_frag},standard:{uniforms:ht([L.common,L.envmap,L.aomap,L.lightmap,L.emissivemap,L.bumpmap,L.normalmap,L.displacementmap,L.roughnessmap,L.metalnessmap,L.fog,L.lights,{emissive:{value:new et(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:B.meshphysical_vert,fragmentShader:B.meshphysical_frag},toon:{uniforms:ht([L.common,L.aomap,L.lightmap,L.emissivemap,L.bumpmap,L.normalmap,L.displacementmap,L.gradientmap,L.fog,L.lights,{emissive:{value:new et(0)}}]),vertexShader:B.meshtoon_vert,fragmentShader:B.meshtoon_frag},matcap:{uniforms:ht([L.common,L.bumpmap,L.normalmap,L.displacementmap,L.fog,{matcap:{value:null}}]),vertexShader:B.meshmatcap_vert,fragmentShader:B.meshmatcap_frag},points:{uniforms:ht([L.points,L.fog]),vertexShader:B.points_vert,fragmentShader:B.points_frag},dashed:{uniforms:ht([L.common,L.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:B.linedashed_vert,fragmentShader:B.linedashed_frag},depth:{uniforms:ht([L.common,L.displacementmap]),vertexShader:B.depth_vert,fragmentShader:B.depth_frag},normal:{uniforms:ht([L.common,L.bumpmap,L.normalmap,L.displacementmap,{opacity:{value:1}}]),vertexShader:B.meshnormal_vert,fragmentShader:B.meshnormal_frag},sprite:{uniforms:ht([L.sprite,L.fog]),vertexShader:B.sprite_vert,fragmentShader:B.sprite_frag},background:{uniforms:{uvTransform:{value:new U},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:B.background_vert,fragmentShader:B.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new U}},vertexShader:B.backgroundCube_vert,fragmentShader:B.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:B.cube_vert,fragmentShader:B.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:B.equirect_vert,fragmentShader:B.equirect_frag},distanceRGBA:{uniforms:ht([L.common,L.displacementmap,{referencePosition:{value:new S},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:B.distanceRGBA_vert,fragmentShader:B.distanceRGBA_frag},shadow:{uniforms:ht([L.lights,L.fog,{color:{value:new et(0)},opacity:{value:1}}]),vertexShader:B.shadow_vert,fragmentShader:B.shadow_frag}};To.physical={uniforms:ht([To.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new U},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new U},clearcoatNormalScale:{value:new G(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new U},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new U},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new U},sheen:{value:0},sheenColor:{value:new et(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new U},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new U},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new U},transmissionSamplerSize:{value:new G},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new U},attenuationDistance:{value:0},attenuationColor:{value:new et(0)},specularColor:{value:new et(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new U},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new U},anisotropyVector:{value:new G},anisotropyMap:{value:null},anisotropyMapTransform:{value:new U}}]),vertexShader:B.meshphysical_vert,fragmentShader:B.meshphysical_frag};var Me=(1+Math.sqrt(5))/2,Xe=1/Me,nx=[new S(-Me,Xe,0),new S(Me,Xe,0),new S(-Xe,0,Me),new S(Xe,0,Me),new S(0,Me,-Xe),new S(0,Me,Xe),new S(-1,1,-1),new S(1,1,-1),new S(-1,1,1),new S(1,1,1)];var ix=new Float32Array(16),sx=new Float32Array(9),rx=new Float32Array(4);var ox={[Zs]:$s,[Js]:js,[Ks]:tr,[gn]:Qs,[$s]:Zs,[js]:Js,[tr]:Ks,[Qs]:gn};var qe=Math.pow(2,-24),bn=Symbol("SKIP_GENERATION"),Mi={strategy:0,maxDepth:40,targetLeafSize:10,useSharedArrayBuffer:!1,setBoundingBox:!0,onProgress:null,indirect:!1,verbose:!0,range:null,[bn]:!1};function Y(c,t,e){return e.min.x=t[c],e.min.y=t[c+1],e.min.z=t[c+2],e.max.x=t[c+3],e.max.y=t[c+4],e.max.z=t[c+5],e}function Tn(c){let t=-1,e=-1/0;for(let n=0;n<3;n++){let i=c[n+3]-c[n];i>e&&(e=i,t=n)}return t}function or(c,t){t.set(c)}function ar(c,t,e){let n,i;for(let s=0;s<3;s++){let r=s+3;n=c[s],i=t[s],e[s]=n<i?n:i,n=c[r],i=t[r],e[r]=n>i?n:i}}function An(c,t,e){for(let n=0;n<3;n++){let i=t[c+2*n],s=t[c+2*n+1],r=i-s,a=i+s;r<e[n]&&(e[n]=r),a>e[n+3]&&(e[n+3]=a)}}function Ye(c){let t=c[3]-c[0],e=c[4]-c[1],n=c[5]-c[2];return 2*(t*e+e*n+n*t)}function O(c,t){return t[c+15]===65535}function W(c,t){return t[c+6]}function q(c,t){return t[c+14]}function k(c){return c+8}function H(c,t){let e=t[c+6];return c+e*8}function Ze(c,t){return t[c+7]}function Si(c,t,e,n,i){let s=1/0,r=1/0,a=1/0,o=-1/0,u=-1/0,l=-1/0,h=1/0,f=1/0,d=1/0,p=-1/0,m=-1/0,y=-1/0,g=c.offset||0;for(let _=(t-g)*6,v=(t+e-g)*6;_<v;_+=6){let x=c[_+0],M=c[_+1],A=x-M,b=x+M;A<s&&(s=A),b>o&&(o=b),x<h&&(h=x),x>p&&(p=x);let T=c[_+2],C=c[_+3],E=T-C,I=T+C;E<r&&(r=E),I>u&&(u=I),T<f&&(f=T),T>m&&(m=T);let w=c[_+4],R=c[_+5],P=w-R,D=w+R;P<a&&(a=P),D>l&&(l=D),w<d&&(d=w),w>y&&(y=w)}n[0]=s,n[1]=r,n[2]=a,n[3]=o,n[4]=u,n[5]=l,i[0]=h,i[1]=f,i[2]=d,i[3]=p,i[4]=m,i[5]=y}var Gt=32,sh=(c,t)=>c.candidate-t.candidate,re=new Array(Gt).fill().map(()=>({count:0,bounds:new Float32Array(6),rightCacheBounds:new Float32Array(6),leftCacheBounds:new Float32Array(6),candidate:0})),bi=new Float32Array(6);function Eo(c,t,e,n,i,s){let r=-1,a=0;if(s===0)r=Tn(t),r!==-1&&(a=(t[r]+t[r+3])/2);else if(s===1)r=Tn(c),r!==-1&&(a=rh(e,n,i,r));else if(s===2){let o=Ye(c),u=1.25*i,l=e.offset||0,h=(n-l)*6,f=(n+i-l)*6;for(let d=0;d<3;d++){let p=t[d],g=(t[d+3]-p)/Gt;if(i<Gt/4){let _=[...re];_.length=i;let v=0;for(let M=h;M<f;M+=6,v++){let A=_[v];A.candidate=e[M+2*d],A.count=0;let{bounds:b,leftCacheBounds:T,rightCacheBounds:C}=A;for(let E=0;E<3;E++)C[E]=1/0,C[E+3]=-1/0,T[E]=1/0,T[E+3]=-1/0,b[E]=1/0,b[E+3]=-1/0;An(M,e,b)}_.sort(sh);let x=i;for(let M=0;M<x;M++){let A=_[M];for(;M+1<x&&_[M+1].candidate===A.candidate;)_.splice(M+1,1),x--}for(let M=h;M<f;M+=6){let A=e[M+2*d];for(let b=0;b<x;b++){let T=_[b];A>=T.candidate?An(M,e,T.rightCacheBounds):(An(M,e,T.leftCacheBounds),T.count++)}}for(let M=0;M<x;M++){let A=_[M],b=A.count,T=i-A.count,C=A.leftCacheBounds,E=A.rightCacheBounds,I=0;b!==0&&(I=Ye(C)/o);let w=0;T!==0&&(w=Ye(E)/o);let R=1+1.25*(I*b+w*T);R<u&&(r=d,u=R,a=A.candidate)}}else{for(let x=0;x<Gt;x++){let M=re[x];M.count=0,M.candidate=p+g+x*g;let A=M.bounds;for(let b=0;b<3;b++)A[b]=1/0,A[b+3]=-1/0}for(let x=h;x<f;x+=6){let b=~~((e[x+2*d]-p)/g);b>=Gt&&(b=Gt-1);let T=re[b];T.count++,An(x,e,T.bounds)}let _=re[Gt-1];or(_.bounds,_.rightCacheBounds);for(let x=Gt-2;x>=0;x--){let M=re[x],A=re[x+1];ar(M.bounds,A.rightCacheBounds,M.rightCacheBounds)}let v=0;for(let x=0;x<Gt-1;x++){let M=re[x],A=M.count,b=M.bounds,C=re[x+1].rightCacheBounds;A!==0&&(v===0?or(b,bi):ar(b,bi,bi)),v+=A;let E=0,I=0;v!==0&&(E=Ye(bi)/o);let w=i-v;w!==0&&(I=Ye(C)/o);let R=1+1.25*(E*v+I*w);R<u&&(r=d,u=R,a=M.candidate)}}}}else console.warn(`BVH: Invalid build strategy value ${s} used.`);return{axis:r,pos:a}}function rh(c,t,e,n){let i=0,s=c.offset;for(let r=t,a=t+e;r<a;r++)i+=c[(r-s)*6+n*2];return i/e}var $e=class{constructor(){this.boundingData=new Float32Array(6)}};function wo(c,t,e,n,i,s){let r=n,a=n+i-1,o=s.pos,u=s.axis*2,l=e.offset||0;for(;;){for(;r<=a&&e[(r-l)*6+u]<o;)r++;for(;r<=a&&e[(a-l)*6+u]>=o;)a--;if(r<a){for(let h=0;h<t;h++){let f=c[r*t+h];c[r*t+h]=c[a*t+h],c[a*t+h]=f}for(let h=0;h<6;h++){let f=r-l,d=a-l,p=e[f*6+h];e[f*6+h]=e[d*6+h],e[d*6+h]=p}r++,a--}else return r}}var Co,Ti,cr,Ro,oh=Math.pow(2,32);function Ai(c){return"count"in c?1:1+Ai(c.left)+Ai(c.right)}function Io(c,t,e){return Co=new Float32Array(e),Ti=new Uint32Array(e),cr=new Uint16Array(e),Ro=new Uint8Array(e),lr(c,t)}function lr(c,t){let e=c/4,n=c/2,i="count"in t,s=t.boundingData;for(let r=0;r<6;r++)Co[e+r]=s[r];if(i)return t.buffer?(Ro.set(new Uint8Array(t.buffer),c),c+t.buffer.byteLength):(Ti[e+6]=t.offset,cr[n+14]=t.count,cr[n+15]=65535,c+32);{let{left:r,right:a,splitAxis:o}=t,u=c+32,l=lr(u,r),h=c/32,d=l/32-h;if(d>oh)throw new Error("MeshBVH: Cannot store relative child node offset greater than 32 bits.");return Ti[e+6]=d,Ti[e+7]=o,lr(l,a)}}function ah(c,t,e,n,i,s){let{maxDepth:r,verbose:a,targetLeafSize:o,_strictLeafSize:u=1/0,strategy:l,onProgress:h}=i,f=c.primitiveBuffer,d=c.primitiveBufferStride,p=new Float32Array(6),m=!1,y=new $e;return Si(t,e,n,y.boundingData,p),_(y,e,n,p),y;function g(v){h&&h((v-s.offset)/s.count)}function _(v,x,M,A=null,b=0){!m&&b>=r&&(m=!0,a&&console.warn(`BVH: Max depth of ${r} reached when generating BVH. Consider increasing maxDepth.`));let T=M>u;if(M<=o&&!T||b>=r)return g(x+M),v.offset=x,v.count=M,v;let C=Eo(v.boundingData,A,t,x,M,l),E=C.axis===-1?-1:wo(f,d,t,x,M,C);if(C.axis===-1||E===x||E===x+M){if(!T)return g(x+M),v.offset=x,v.count=M,v;C.axis=Math.max(0,Tn(v.boundingData)),E=x+Math.max(1,Math.floor(M/2))}v.splitAxis=C.axis;let I=new $e,w=x,R=E-x;v.left=I,Si(t,w,R,I.boundingData,p),_(I,w,R,p,b+1);let P=new $e,D=E,N=M-R;return v.right=P,Si(t,D,N,P.boundingData,p),_(P,D,N,p,b+1),v}}function Po(c,t){let e=t.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,n=c.getRootRanges(t.range),i=n[0],s=n[n.length-1],r={offset:i.offset,count:s.offset+s.count-i.offset},a=new Float32Array(6*r.count);a.offset=r.offset,c.computePrimitiveBounds(r.offset,r.count,a),c._roots=n.map(o=>{let u=ah(c,a,o.offset,o.count,t,r),l=Ai(u),h=new e(32*l);return Io(0,u,h),h})}var oe=class{constructor(t){this._getNewPrimitive=t,this._primitives=[]}getPrimitive(){let t=this._primitives;return t.length===0?this._getNewPrimitive():t.pop()}releasePrimitive(t){this._primitives.push(t)}};var ur=class{constructor(){this.float32Array=null,this.uint16Array=null,this.uint32Array=null;let t=[],e=null;this.setBuffer=n=>{e&&t.push(e),e=n,this.float32Array=new Float32Array(n),this.uint16Array=new Uint16Array(n),this.uint32Array=new Uint32Array(n)},this.clearBuffer=()=>{e=null,this.float32Array=null,this.uint16Array=null,this.uint32Array=null,t.length!==0&&this.setBuffer(t.pop())}}},z=new ur;var ae,Ke,Je=[],Ei=new oe(()=>new J);function Lo(c,t,e,n,i,s){ae=Ei.getPrimitive(),Ke=Ei.getPrimitive(),Je.push(ae,Ke),z.setBuffer(c._roots[t]);let r=hr(0,c.geometry,e,n,i,s);z.clearBuffer(),Ei.releasePrimitive(ae),Ei.releasePrimitive(Ke),Je.pop(),Je.pop();let a=Je.length;return a>0&&(Ke=Je[a-1],ae=Je[a-2]),r}function hr(c,t,e,n,i=null,s=0,r=0){let{float32Array:a,uint16Array:o,uint32Array:u}=z,l=c*2;if(O(l,o)){let f=W(c,u),d=q(l,o);return Y(c,a,ae),n(f,d,!1,r,s+c/8,ae)}else{let E=function(w){let{uint16Array:R,uint32Array:P}=z,D=w*2;for(;!O(D,R);)w=k(w),D=w*2;return W(w,P)},I=function(w){let{uint16Array:R,uint32Array:P}=z,D=w*2;for(;!O(D,R);)w=H(w,P),D=w*2;return W(w,P)+q(D,R)},f=k(c),d=H(c,u),p=f,m=d,y,g,_,v;if(i&&(_=ae,v=Ke,Y(p,a,_),Y(m,a,v),y=i(_),g=i(v),g<y)){p=d,m=f;let w=y;y=g,g=w,_=v}_||(_=ae,Y(p,a,_));let x=O(p*2,o),M=e(_,x,y,r+1,s+p/8),A;if(M===2){let w=E(p),P=I(p)-w;A=n(w,P,!0,r+1,s+p/8,_)}else A=M&&hr(p,t,e,n,i,s,r+1);if(A)return!0;v=Ke,Y(m,a,v);let b=O(m*2,o),T=e(v,b,g,r+1,s+m/8),C;if(T===2){let w=E(m),P=I(m)-w;C=n(w,P,!0,r+1,s+m/8,v)}else C=T&&hr(m,t,e,n,i,s,r+1);return!!C}}var En=new z.constructor,wi=new z.constructor,ce=new oe(()=>new J),Qe=new J,je=new J,dr=new J,pr=new J,mr=!1;function Do(c,t,e,n){if(mr)throw new Error("MeshBVH: Recursive calls to bvhcast not supported.");mr=!0;let i=c._roots,s=t._roots,r,a=0,o=0,u=new V().copy(e).invert();for(let l=0,h=i.length;l<h;l++){En.setBuffer(i[l]),o=0;let f=ce.getPrimitive();Y(0,En.float32Array,f),f.applyMatrix4(u);for(let d=0,p=s.length;d<p&&(wi.setBuffer(s[d]),r=Ct(0,0,e,u,n,a,o,0,0,f),wi.clearBuffer(),o+=s[d].byteLength/32,!r);d++);if(ce.releasePrimitive(f),En.clearBuffer(),a+=i[l].byteLength/32,r)break}return mr=!1,r}function Ct(c,t,e,n,i,s=0,r=0,a=0,o=0,u=null,l=!1){let h,f;l?(h=wi,f=En):(h=En,f=wi);let d=h.float32Array,p=h.uint32Array,m=h.uint16Array,y=f.float32Array,g=f.uint32Array,_=f.uint16Array,v=c*2,x=t*2,M=O(v,m),A=O(x,_),b=!1;if(A&&M)l?b=i(W(t,g),q(t*2,_),W(c,p),q(c*2,m),o,r+t/8,a,s+c/8):b=i(W(c,p),q(c*2,m),W(t,g),q(t*2,_),a,s+c/8,o,r+t/8);else if(A){let T=ce.getPrimitive();Y(t,y,T),T.applyMatrix4(e);let C=k(c),E=H(c,p);Y(C,d,Qe),Y(E,d,je);let I=T.intersectsBox(Qe),w=T.intersectsBox(je);b=I&&Ct(t,C,n,e,i,r,s,o,a+1,T,!l)||w&&Ct(t,E,n,e,i,r,s,o,a+1,T,!l),ce.releasePrimitive(T)}else{let T=k(t),C=H(t,g);Y(T,y,dr),Y(C,y,pr);let E=u.intersectsBox(dr),I=u.intersectsBox(pr);if(E&&I)b=Ct(c,T,e,n,i,s,r,a,o+1,u,l)||Ct(c,C,e,n,i,s,r,a,o+1,u,l);else if(E)if(M)b=Ct(c,T,e,n,i,s,r,a,o+1,u,l);else{let w=ce.getPrimitive();w.copy(dr).applyMatrix4(e);let R=k(c),P=H(c,p);Y(R,d,Qe),Y(P,d,je);let D=w.intersectsBox(Qe),N=w.intersectsBox(je);b=D&&Ct(T,R,n,e,i,r,s,o,a+1,w,!l)||N&&Ct(T,P,n,e,i,r,s,o,a+1,w,!l),ce.releasePrimitive(w)}else if(I)if(M)b=Ct(c,C,e,n,i,s,r,a,o+1,u,l);else{let w=ce.getPrimitive();w.copy(pr).applyMatrix4(e);let R=k(c),P=H(c,p);Y(R,d,Qe),Y(P,d,je);let D=w.intersectsBox(Qe),N=w.intersectsBox(je);b=D&&Ct(C,R,n,e,i,r,s,o,a+1,w,!l)||N&&Ct(C,P,n,e,i,r,s,o,a+1,w,!l),ce.releasePrimitive(w)}}return b}var Ci=new class{constructor(){let c=null,t=null,e=null,n=!1;this.root=null,this.buffer=null,this.uint32Array=null,this.uint16Array=null,this.setBVH=(s,r)=>{if(n)throw new Error("BVHTraversalHelper: cannot call setBVH during an active traversal.");this.root=r,this.buffer=c=s._roots[r],this.uint16Array=e=new Uint16Array(c),this.uint32Array=t=new Uint32Array(c)},this.reset=()=>{this.root=null,this.buffer=c=null,this.uint16Array=e=null,this.uint32Array=t=null},this.getRangeStart=s=>{let r=s*2;for(;!O(r,e);)s=k(s),r=s*2;return W(s,t)},this.getRangeEnd=s=>{let r=s*2;for(;!O(r,e);)s=H(s,t),r=s*2;return W(s,t)+q(r,e)};let i=(s,r,a)=>{let o=r*2,u=O(o,e);if(!s(a,u,r)&&!u){let h=k(r),f=H(r,t);i(s,h,a+1),i(s,f,a+1)}};this.traverseBuffer=s=>{if(n)throw new Error("BVHTraversalHelper: cannot start a traversal during an active traversal.");n=!0;try{i(s,0,0)}finally{n=!1}},this.traverse=s=>{this.traverseBuffer((r,a,o)=>{if(a){let u=o*2,l=t[o+6],h=e[u+14];return s(r,a,new Float32Array(c,o*4,6),l,h)}else{let u=Ze(o,t);return s(r,a,new Float32Array(c,o*4,6),u)}})}}};var Uo=new J,tn=new Float32Array(6),Ri=class{constructor(){this._roots=null,this.primitiveBuffer=null,this.primitiveBufferStride=null}init(t){t={...Mi,...t},"maxLeafSize"in t&&(console.warn('BVH: "maxLeafSize" option has been deprecated. Use "targetLeafSize", instead.'),t={...t,targetLeafSize:t.maxLeafSize}),Po(this,t)}getRootRanges(){throw new Error("BVH: getRootRanges() not implemented")}writePrimitiveBounds(){throw new Error("BVH: writePrimitiveBounds() not implemented")}writePrimitiveRangeBounds(t,e,n,i){let s=1/0,r=1/0,a=1/0,o=-1/0,u=-1/0,l=-1/0;for(let h=t,f=t+e;h<f;h++){this.writePrimitiveBounds(h,tn,0);let[d,p,m,y,g,_]=tn;d<s&&(s=d),y>o&&(o=y),p<r&&(r=p),g>u&&(u=g),m<a&&(a=m),_>l&&(l=_)}return n[i+0]=s,n[i+1]=r,n[i+2]=a,n[i+3]=o,n[i+4]=u,n[i+5]=l,n}computePrimitiveBounds(t,e,n){let i=n.offset||0;for(let s=t,r=t+e;s<r;s++){this.writePrimitiveBounds(s,tn,0);let[a,o,u,l,h,f]=tn,d=(a+l)/2,p=(o+h)/2,m=(u+f)/2,y=(l-a)/2,g=(h-o)/2,_=(f-u)/2,v=(s-i)*6;n[v+0]=d,n[v+1]=y+(Math.abs(d)+y)*qe,n[v+2]=p,n[v+3]=g+(Math.abs(p)+g)*qe,n[v+4]=m,n[v+5]=_+(Math.abs(m)+_)*qe}return n}shiftPrimitiveOffsets(t){let e=this._indirectBuffer;if(e)for(let n=0,i=e.length;n<i;n++)e[n]+=t;else{let n=this._roots;for(let i=0;i<n.length;i++){let s=n[i],r=new Uint32Array(s),a=new Uint16Array(s),o=s.byteLength/32;for(let u=0;u<o;u++){let l=8*u,h=2*l;O(h,a)&&(r[l+6]+=t)}}}}traverse(t,e=0){Ci.setBVH(this,e),Ci.traverse(t),Ci.reset()}refit(){let t=this._roots;for(let e=0,n=t.length;e<n;e++){let i=t[e],s=new Uint32Array(i),r=new Uint16Array(i),a=new Float32Array(i),o=i.byteLength/32;for(let u=o-1;u>=0;u--){let l=u*8,h=l*2;if(O(h,r)){let d=W(l,s),p=q(h,r);this.writePrimitiveRangeBounds(d,p,tn,0),a.set(tn,l)}else{let d=k(l),p=H(l,s);for(let m=0;m<3;m++){let y=a[d+m],g=a[d+m+3],_=a[p+m],v=a[p+m+3];a[l+m]=y<_?y:_,a[l+m+3]=g>v?g:v}}}}}getBoundingBox(t){return t.makeEmpty(),this._roots.forEach(n=>{Y(0,new Float32Array(n),Uo),t.union(Uo)}),t}shapecast(t){let{boundsTraverseOrder:e,intersectsBounds:n,intersectsRange:i,intersectsPrimitive:s,scratchPrimitive:r,iterate:a}=t;if(i&&s){let h=i;i=(f,d,p,m,y)=>h(f,d,p,m,y)?!0:a(f,d,this,s,p,m,r)}else i||(s?i=(h,f,d,p)=>a(h,f,this,s,d,p,r):i=(h,f,d)=>d);let o=!1,u=0,l=this._roots;for(let h=0,f=l.length;h<f;h++){let d=l[h];if(o=Lo(this,h,n,i,e,u),o)break;u+=d.byteLength/32}return o}bvhcast(t,e,n){let{intersectsRanges:i}=n;return Do(this,t,e,i)}};function No(){return typeof SharedArrayBuffer<"u"}function gr(c){return c.index?c.index.count:c.attributes.position.count}function le(c){return gr(c)/3}function lh(c,t=ArrayBuffer){return c>65535?new Uint32Array(new t(4*c)):new Uint16Array(new t(2*c))}function Fo(c,t){if(!c.index){let e=c.attributes.position.count,n=t.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,i=lh(e,n);c.setIndex(new Q(i,1));for(let s=0;s<e;s++)i[s]=s}}function uh(c,t,e){let n=gr(c)/e,i=t||c.drawRange,s=i.start/e,r=(i.start+i.count)/e,a=Math.max(0,s),o=Math.min(n,r)-a;return{offset:Math.floor(a),count:Math.floor(o)}}function hh(c,t){return c.groups.map(e=>({offset:e.start/t,count:e.count/t}))}function _r(c,t,e){let n=uh(c,t,e),i=hh(c,e);if(!i.length)return[n];let s=[],r=n.offset,a=n.offset+n.count,o=gr(c)/e,u=[];for(let f of i){let{offset:d,count:p}=f,m=d,y=isFinite(p)?p:o-d,g=d+y;m<a&&g>r&&(u.push({pos:Math.max(r,m),isStart:!0}),u.push({pos:Math.min(a,g),isStart:!1}))}u.sort((f,d)=>f.pos!==d.pos?f.pos-d.pos:f.type==="end"?-1:1);let l=0,h=null;for(let f of u){let d=f.pos;l!==0&&d!==h&&s.push({offset:h,count:d-h}),l+=f.isStart?1:-1,h=d}return s}function fh(c,t){let e=c[c.length-1],n=e.offset+e.count>2**16,i=c.reduce((u,l)=>u+l.count,0),s=n?4:2,r=t?new SharedArrayBuffer(i*s):new ArrayBuffer(i*s),a=n?new Uint32Array(r):new Uint16Array(r),o=0;for(let u=0;u<c.length;u++){let{offset:l,count:h}=c[u];for(let f=0;f<h;f++)a[o+f]=l+f;o+=h}return a}var Ii=class extends Ri{get indirect(){return!!this._indirectBuffer}get primitiveStride(){return null}get primitiveBufferStride(){return this.indirect?1:this.primitiveStride}set primitiveBufferStride(t){}get primitiveBuffer(){return this.indirect?this._indirectBuffer:this.geometry.index.array}set primitiveBuffer(t){}constructor(t,e={}){if(t.isBufferGeometry){if(t.index&&t.index.isInterleavedBufferAttribute)throw new Error("BVH: InterleavedBufferAttribute is not supported for the index attribute.")}else throw new Error("BVH: Only BufferGeometries are supported.");if(e.useSharedArrayBuffer&&!No())throw new Error("BVH: SharedArrayBuffer is not available.");super(),this.geometry=t,this.resolvePrimitiveIndex=e.indirect?n=>this._indirectBuffer[n]:n=>n,this.primitiveBuffer=null,this.primitiveBufferStride=null,this._indirectBuffer=null,e={...Mi,...e},e[bn]||this.init(e)}init(t){let{geometry:e,primitiveStride:n}=this;if(t.indirect){let i=_r(e,t.range,n),s=fh(i,t.useSharedArrayBuffer);this._indirectBuffer=s}else Fo(e,t);super.init(t),!e.boundingBox&&t.setBoundingBox&&(e.boundingBox=this.getBoundingBox(new J))}getRootRanges(t){return this.indirect?[{offset:0,count:this._indirectBuffer.length}]:_r(this.geometry,t,this.primitiveStride)}raycastObject3D(){throw new Error("BVH: raycastObject3D() not implemented")}};var _t=class{constructor(){this.min=1/0,this.max=-1/0}setFromPointsField(t,e){let n=1/0,i=-1/0;for(let s=0,r=t.length;s<r;s++){let o=t[s][e];n=o<n?o:n,i=o>i?o:i}this.min=n,this.max=i}setFromPoints(t,e){let n=1/0,i=-1/0;for(let s=0,r=e.length;s<r;s++){let a=e[s],o=t.dot(a);n=o<n?o:n,i=o>i?o:i}this.min=n,this.max=i}isSeparated(t){return this.min>t.max||t.min>this.max}};_t.prototype.setFromBox=(function(){let c=new S;return function(e,n){let i=n.min,s=n.max,r=1/0,a=-1/0;for(let o=0;o<=1;o++)for(let u=0;u<=1;u++)for(let l=0;l<=1;l++){c.x=i.x*o+s.x*(1-o),c.y=i.y*u+s.y*(1-u),c.z=i.z*l+s.z*(1-l);let h=e.dot(c);r=Math.min(h,r),a=Math.max(h,a)}this.min=r,this.max=a}})();var dh=(function(){let c=new S,t=new S,e=new S;return function(i,s,r){let a=i.start,o=c,u=s.start,l=t;e.subVectors(a,u),c.subVectors(i.end,i.start),t.subVectors(s.end,s.start);let h=e.dot(l),f=l.dot(o),d=l.dot(l),p=e.dot(o),y=o.dot(o)*d-f*f,g,_;y!==0?g=(h*f-p*d)/y:g=0,_=(h+g*f)/d,r.x=g,r.y=_}})(),wn=(function(){let c=new G,t=new S,e=new S;return function(i,s,r,a){dh(i,s,c);let o=c.x,u=c.y;if(o>=0&&o<=1&&u>=0&&u<=1){i.at(o,r),s.at(u,a);return}else if(o>=0&&o<=1){u<0?s.at(0,a):s.at(1,a),i.closestPointToPoint(a,!0,r);return}else if(u>=0&&u<=1){o<0?i.at(0,r):i.at(1,r),s.closestPointToPoint(r,!0,a);return}else{let l;o<0?l=i.start:l=i.end;let h;u<0?h=s.start:h=s.end;let f=t,d=e;if(i.closestPointToPoint(h,!0,t),s.closestPointToPoint(l,!0,e),f.distanceToSquared(h)<=d.distanceToSquared(l)){r.copy(f),a.copy(h);return}else{r.copy(l),a.copy(d);return}}}})(),Bo=(function(){let c=new S,t=new S,e=new Ht,n=new nt;return function(s,r){let{radius:a,center:o}=s,{a:u,b:l,c:h}=r;if(n.start=u,n.end=l,n.closestPointToPoint(o,!0,c).distanceTo(o)<=a||(n.start=u,n.end=h,n.closestPointToPoint(o,!0,c).distanceTo(o)<=a)||(n.start=l,n.end=h,n.closestPointToPoint(o,!0,c).distanceTo(o)<=a))return!0;let m=r.getPlane(e);if(Math.abs(m.distanceToPoint(o))<=a){let g=m.projectPoint(o,t);if(r.containsPoint(g))return!0}return!1}})();var ph=["x","y","z"],Wt=1e-15,Oo=Wt*Wt;function St(c){return Math.abs(c)<Wt}var st=class extends X{constructor(...t){super(...t),this.isExtendedTriangle=!0,this.satAxes=new Array(4).fill().map(()=>new S),this.satBounds=new Array(4).fill().map(()=>new _t),this.points=[this.a,this.b,this.c],this.plane=new Ht,this.isDegenerateIntoSegment=!1,this.isDegenerateIntoPoint=!1,this.degenerateSegment=new nt,this.needsUpdate=!0}intersectsSphere(t){return Bo(t,this)}update(){let t=this.a,e=this.b,n=this.c,i=this.points,s=this.satAxes,r=this.satBounds,a=s[0],o=r[0];this.getNormal(a),o.setFromPoints(a,i);let u=s[1],l=r[1];u.subVectors(t,e),l.setFromPoints(u,i);let h=s[2],f=r[2];h.subVectors(e,n),f.setFromPoints(h,i);let d=s[3],p=r[3];d.subVectors(n,t),p.setFromPoints(d,i);let m=u.length(),y=h.length(),g=d.length();this.isDegenerateIntoPoint=!1,this.isDegenerateIntoSegment=!1,m<Wt?y<Wt||g<Wt?this.isDegenerateIntoPoint=!0:(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(t),this.degenerateSegment.end.copy(n)):y<Wt?g<Wt?this.isDegenerateIntoPoint=!0:(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(e),this.degenerateSegment.end.copy(t)):g<Wt&&(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(n),this.degenerateSegment.end.copy(e)),this.plane.setFromNormalAndCoplanarPoint(a,t),this.needsUpdate=!1}};st.prototype.closestPointToSegment=(function(){let c=new S,t=new S,e=new nt;return function(i,s=null,r=null){let{start:a,end:o}=i,u=this.points,l,h=1/0;for(let f=0;f<3;f++){let d=(f+1)%3;e.start.copy(u[f]),e.end.copy(u[d]),wn(e,i,c,t),l=c.distanceToSquared(t),l<h&&(h=l,s&&s.copy(c),r&&r.copy(t))}return this.closestPointToPoint(a,c),l=a.distanceToSquared(c),l<h&&(h=l,s&&s.copy(c),r&&r.copy(a)),this.closestPointToPoint(o,c),l=o.distanceToSquared(c),l<h&&(h=l,s&&s.copy(c),r&&r.copy(o)),Math.sqrt(h)}})();st.prototype.intersectsTriangle=(function(){let c=new st,t=new _t,e=new _t,n=new S,i=new S,s=new S,r=new S,a=new nt,o=new nt,u=new S,l=new G,h=new G;function f(v,x,M,A){let b=n;!v.isDegenerateIntoPoint&&!v.isDegenerateIntoSegment?b.copy(v.plane.normal):b.copy(x.plane.normal);let T=v.satBounds,C=v.satAxes;for(let w=1;w<4;w++){let R=T[w],P=C[w];if(t.setFromPoints(P,x.points),R.isSeparated(t)||(r.copy(b).cross(P),t.setFromPoints(r,v.points),e.setFromPoints(r,x.points),t.isSeparated(e)))return!1}let E=x.satBounds,I=x.satAxes;for(let w=1;w<4;w++){let R=E[w],P=I[w];if(t.setFromPoints(P,v.points),R.isSeparated(t)||(r.crossVectors(b,P),t.setFromPoints(r,v.points),e.setFromPoints(r,x.points),t.isSeparated(e)))return!1}return M&&(A||console.warn("ExtendedTriangle.intersectsTriangle: Triangles are coplanar which does not support an output edge. Setting edge to 0, 0, 0."),M.start.set(0,0,0),M.end.set(0,0,0)),!0}function d(v,x,M,A,b,T,C,E,I,w,R){let P=C/(C-E);w.x=A+(b-A)*P,R.start.subVectors(x,v).multiplyScalar(P).add(v),P=C/(C-I),w.y=A+(T-A)*P,R.end.subVectors(M,v).multiplyScalar(P).add(v)}function p(v,x,M,A,b,T,C,E,I,w,R){if(b>0)d(v.c,v.a,v.b,A,x,M,I,C,E,w,R);else if(T>0)d(v.b,v.a,v.c,M,x,A,E,C,I,w,R);else if(E*I>0||C!=0)d(v.a,v.b,v.c,x,M,A,C,E,I,w,R);else if(E!=0)d(v.b,v.a,v.c,M,x,A,E,C,I,w,R);else if(I!=0)d(v.c,v.a,v.b,A,x,M,I,C,E,w,R);else return!0;return!1}function m(v,x,M,A){let b=x.degenerateSegment,T=v.plane.distanceToPoint(b.start),C=v.plane.distanceToPoint(b.end);return St(T)?St(C)?f(v,x,M,A):(M&&(M.start.copy(b.start),M.end.copy(b.start)),v.containsPoint(b.start)):St(C)?(M&&(M.start.copy(b.end),M.end.copy(b.end)),v.containsPoint(b.end)):v.plane.intersectLine(b,n)!=null?(M&&(M.start.copy(n),M.end.copy(n)),v.containsPoint(n)):!1}function y(v,x,M){let A=x.a;return St(v.plane.distanceToPoint(A))&&v.containsPoint(A)?(M&&(M.start.copy(A),M.end.copy(A)),!0):!1}function g(v,x,M){let A=v.degenerateSegment,b=x.a;return A.closestPointToPoint(b,!0,n),b.distanceToSquared(n)<Oo?(M&&(M.start.copy(b),M.end.copy(b)),!0):!1}function _(v,x,M,A){if(v.isDegenerateIntoSegment)if(x.isDegenerateIntoSegment){let b=v.degenerateSegment,T=x.degenerateSegment,C=i,E=s;b.delta(C),T.delta(E);let I=n.subVectors(T.start,b.start),w=C.x*E.y-C.y*E.x;if(St(w))return!1;let R=(I.x*E.y-I.y*E.x)/w,P=-(C.x*I.y-C.y*I.x)/w;if(R<0||R>1||P<0||P>1)return!1;let D=b.start.z+C.z*R,N=T.start.z+E.z*P;return St(D-N)?(M&&(M.start.copy(b.start).addScaledVector(C,R),M.end.copy(b.start).addScaledVector(C,R)),!0):!1}else return x.isDegenerateIntoPoint?g(v,x,M):m(x,v,M,A);else{if(v.isDegenerateIntoPoint)return x.isDegenerateIntoPoint?x.a.distanceToSquared(v.a)<Oo?(M&&(M.start.copy(v.a),M.end.copy(v.a)),!0):!1:x.isDegenerateIntoSegment?g(x,v,M):y(x,v,M);if(x.isDegenerateIntoPoint)return y(v,x,M);if(x.isDegenerateIntoSegment)return m(v,x,M,A)}}return function(x,M=null,A=!1){this.needsUpdate&&this.update(),x.isExtendedTriangle?x.needsUpdate&&x.update():(c.copy(x),c.update(),x=c);let b=_(this,x,M,A);if(b!==void 0)return b;let T=this.plane,C=x.plane,E=C.distanceToPoint(this.a),I=C.distanceToPoint(this.b),w=C.distanceToPoint(this.c);St(E)&&(E=0),St(I)&&(I=0),St(w)&&(w=0);let R=E*I,P=E*w;if(R>0&&P>0)return!1;let D=T.distanceToPoint(x.a),N=T.distanceToPoint(x.b),ot=T.distanceToPoint(x.c);St(D)&&(D=0),St(N)&&(N=0),St(ot)&&(ot=0);let Zt=D*N,Ut=D*ot;if(Zt>0&&Ut>0)return!1;i.copy(T.normal),s.copy(C.normal);let $t=i.cross(s),Jt=0,ls=Math.abs($t.x),Kr=Math.abs($t.y);Kr>ls&&(ls=Kr,Jt=1),Math.abs($t.z)>ls&&(Jt=2);let Ie=ph[Jt],Xa=this.a[Ie],qa=this.b[Ie],Ya=this.c[Ie],Za=x.a[Ie],$a=x.b[Ie],Ja=x.c[Ie];if(p(this,Xa,qa,Ya,R,P,E,I,w,l,a))return f(this,x,M,A);if(p(x,Za,$a,Ja,Zt,Ut,D,N,ot,h,o))return f(this,x,M,A);if(l.y<l.x){let us=l.y;l.y=l.x,l.x=us,u.copy(a.start),a.start.copy(a.end),a.end.copy(u)}if(h.y<h.x){let us=h.y;h.y=h.x,h.x=us,u.copy(o.start),o.start.copy(o.end),o.end.copy(u)}return l.y<h.x||h.y<l.x?!1:(M&&(h.x>l.x?M.start.copy(o.start):M.start.copy(a.start),h.y<l.y?M.end.copy(o.end):M.end.copy(a.end)),!0)}})();st.prototype.distanceToPoint=(function(){let c=new S;return function(e){return this.closestPointToPoint(e,c),e.distanceTo(c)}})();st.prototype.distanceToTriangle=(function(){let c=new S,t=new S,e=["a","b","c"],n=new nt,i=new nt;return function(r,a=null,o=null){let u=a||o?n:null;if(this.intersectsTriangle(r,u,!0))return(a||o)&&(a&&u.getCenter(a),o&&u.getCenter(o)),0;let l=1/0;for(let h=0;h<3;h++){let f,d=e[h],p=r[d];this.closestPointToPoint(p,c),f=p.distanceToSquared(c),f<l&&(l=f,a&&a.copy(c),o&&o.copy(p));let m=this[d];r.closestPointToPoint(m,c),f=m.distanceToSquared(c),f<l&&(l=f,a&&a.copy(m),o&&o.copy(c))}for(let h=0;h<3;h++){let f=e[h],d=e[(h+1)%3];n.set(this[f],this[d]);for(let p=0;p<3;p++){let m=e[p],y=e[(p+1)%3];i.set(r[m],r[y]),wn(n,i,c,t);let g=c.distanceToSquared(t);g<l&&(l=g,a&&a.copy(c),o&&o.copy(t))}}return Math.sqrt(l)}})();var K=class{constructor(t,e,n){this.isOrientedBox=!0,this.min=new S,this.max=new S,this.matrix=new V,this.invMatrix=new V,this.points=new Array(8).fill().map(()=>new S),this.satAxes=new Array(3).fill().map(()=>new S),this.satBounds=new Array(3).fill().map(()=>new _t),this.alignedSatBounds=new Array(3).fill().map(()=>new _t),this.needsUpdate=!1,t&&this.min.copy(t),e&&this.max.copy(e),n&&this.matrix.copy(n)}set(t,e,n){this.min.copy(t),this.max.copy(e),this.matrix.copy(n),this.needsUpdate=!0}copy(t){this.min.copy(t.min),this.max.copy(t.max),this.matrix.copy(t.matrix),this.needsUpdate=!0}};K.prototype.update=(function(){return function(){let t=this.matrix,e=this.min,n=this.max,i=this.points;for(let u=0;u<=1;u++)for(let l=0;l<=1;l++)for(let h=0;h<=1;h++){let f=1*u|2*l|4*h,d=i[f];d.x=u?n.x:e.x,d.y=l?n.y:e.y,d.z=h?n.z:e.z,d.applyMatrix4(t)}let s=this.satBounds,r=this.satAxes,a=i[0];for(let u=0;u<3;u++){let l=r[u],h=s[u],f=1<<u,d=i[f];l.subVectors(a,d),h.setFromPoints(l,i)}let o=this.alignedSatBounds;o[0].setFromPointsField(i,"x"),o[1].setFromPointsField(i,"y"),o[2].setFromPointsField(i,"z"),this.invMatrix.copy(this.matrix).invert(),this.needsUpdate=!1}})();K.prototype.intersectsBox=(function(){let c=new _t;return function(e){this.needsUpdate&&this.update();let n=e.min,i=e.max,s=this.satBounds,r=this.satAxes,a=this.alignedSatBounds;if(c.min=n.x,c.max=i.x,a[0].isSeparated(c)||(c.min=n.y,c.max=i.y,a[1].isSeparated(c))||(c.min=n.z,c.max=i.z,a[2].isSeparated(c)))return!1;for(let o=0;o<3;o++){let u=r[o],l=s[o];if(c.setFromBox(u,e),l.isSeparated(c))return!1}return!0}})();K.prototype.intersectsTriangle=(function(){let c=new st,t=new Array(3),e=new _t,n=new _t,i=new S;return function(r){this.needsUpdate&&this.update(),r.isExtendedTriangle?r.needsUpdate&&r.update():(c.copy(r),c.update(),r=c);let a=this.satBounds,o=this.satAxes;t[0]=r.a,t[1]=r.b,t[2]=r.c;for(let f=0;f<3;f++){let d=a[f],p=o[f];if(e.setFromPoints(p,t),d.isSeparated(e))return!1}let u=r.satBounds,l=r.satAxes,h=this.points;for(let f=0;f<3;f++){let d=u[f],p=l[f];if(e.setFromPoints(p,h),d.isSeparated(e))return!1}for(let f=0;f<3;f++){let d=o[f];for(let p=0;p<4;p++){let m=l[p];if(i.crossVectors(d,m),e.setFromPoints(i,t),n.setFromPoints(i,h),e.isSeparated(n))return!1}}return!0}})();K.prototype.closestPointToPoint=(function(){return function(t,e){return this.needsUpdate&&this.update(),e.copy(t).applyMatrix4(this.invMatrix).clamp(this.min,this.max).applyMatrix4(this.matrix),e}})();K.prototype.distanceToPoint=(function(){let c=new S;return function(e){return this.closestPointToPoint(e,c),e.distanceTo(c)}})();K.prototype.distanceToBox=(function(){let c=["x","y","z"],t=new Array(12).fill().map(()=>new nt),e=new Array(12).fill().map(()=>new nt),n=new S,i=new S;return function(r,a=0,o=null,u=null){if(this.needsUpdate&&this.update(),this.intersectsBox(r))return(o||u)&&(r.getCenter(i),this.closestPointToPoint(i,n),r.closestPointToPoint(n,i),o&&o.copy(n),u&&u.copy(i)),0;let l=a*a,h=r.min,f=r.max,d=this.points,p=1/0;for(let y=0;y<8;y++){let g=d[y];i.copy(g).clamp(h,f);let _=g.distanceToSquared(i);if(_<p&&(p=_,o&&o.copy(g),u&&u.copy(i),_<l))return Math.sqrt(_)}let m=0;for(let y=0;y<3;y++)for(let g=0;g<=1;g++)for(let _=0;_<=1;_++){let v=(y+1)%3,x=(y+2)%3,M=g<<v|_<<x,A=1<<y|g<<v|_<<x,b=d[M],T=d[A];t[m].set(b,T);let E=c[y],I=c[v],w=c[x],R=e[m],P=R.start,D=R.end;P[E]=h[E],P[I]=g?h[I]:f[I],P[w]=_?h[w]:f[I],D[E]=f[E],D[I]=g?h[I]:f[I],D[w]=_?h[w]:f[I],m++}for(let y=0;y<=1;y++)for(let g=0;g<=1;g++)for(let _=0;_<=1;_++){i.x=y?f.x:h.x,i.y=g?f.y:h.y,i.z=_?f.z:h.z,this.closestPointToPoint(i,n);let v=i.distanceToSquared(n);if(v<p&&(p=v,o&&o.copy(n),u&&u.copy(i),v<l))return Math.sqrt(v)}for(let y=0;y<12;y++){let g=t[y];for(let _=0;_<12;_++){let v=e[_];wn(g,v,n,i);let x=n.distanceToSquared(i);if(x<p&&(p=x,o&&o.copy(n),u&&u.copy(i),x<l))return Math.sqrt(x)}}return Math.sqrt(p)}})();var xr=class extends oe{constructor(){super(()=>new st)}},ft=new xr;var Cn=new S,yr=new S;function zo(c,t,e={},n=0,i=1/0){let s=n*n,r=i*i,a=1/0,o=null;if(c.shapecast({boundsTraverseOrder:l=>(Cn.copy(t).clamp(l.min,l.max),Cn.distanceToSquared(t)),intersectsBounds:(l,h,f)=>f<a&&f<r,intersectsTriangle:(l,h)=>{l.closestPointToPoint(t,Cn);let f=t.distanceToSquared(Cn);return f<a&&(yr.copy(Cn),a=f,o=h),f<s}}),a===1/0)return null;let u=Math.sqrt(a);return e.point?e.point.copy(yr):e.point=yr.clone(),e.distance=u,e.faceIndex=o,e}var Pi=parseInt("172")>=169,mh=parseInt("172")<=161,Se=new S,be=new S,Te=new S,Li=new G,Di=new G,Ui=new G,Vo=new S,ko=new S,Ho=new S,Rn=new S;function gh(c,t,e,n,i,s,r,a){let o;if(s===vi?o=c.intersectTriangle(n,e,t,!0,i):o=c.intersectTriangle(t,e,n,s!==We,i),o===null)return null;let u=c.origin.distanceTo(i);return u<r||u>a?null:{distance:u,point:i.clone()}}function Go(c,t,e,n,i,s,r,a,o,u,l){Se.fromBufferAttribute(t,s),be.fromBufferAttribute(t,r),Te.fromBufferAttribute(t,a);let h=gh(c,Se,be,Te,Rn,o,u,l);if(h){if(n){Li.fromBufferAttribute(n,s),Di.fromBufferAttribute(n,r),Ui.fromBufferAttribute(n,a),h.uv=new G;let d=X.getInterpolation(Rn,Se,be,Te,Li,Di,Ui,h.uv);Pi||(h.uv=d)}if(i){Li.fromBufferAttribute(i,s),Di.fromBufferAttribute(i,r),Ui.fromBufferAttribute(i,a),h.uv1=new G;let d=X.getInterpolation(Rn,Se,be,Te,Li,Di,Ui,h.uv1);Pi||(h.uv1=d),mh&&(h.uv2=h.uv1)}if(e){Vo.fromBufferAttribute(e,s),ko.fromBufferAttribute(e,r),Ho.fromBufferAttribute(e,a),h.normal=new S;let d=X.getInterpolation(Rn,Se,be,Te,Vo,ko,Ho,h.normal);h.normal.dot(c.direction)>0&&h.normal.multiplyScalar(-1),Pi||(h.normal=d)}let f={a:s,b:r,c:a,normal:new S,materialIndex:0};if(X.getNormal(Se,be,Te,f.normal),h.face=f,h.faceIndex=s,Pi){let d=new S;X.getBarycoord(Rn,Se,be,Te,d),h.barycoord=d}}return h}function Wo(c){return c&&c.isMaterial?c.side:c}function en(c,t,e,n,i,s,r){let a=n*3,o=a+0,u=a+1,l=a+2,{index:h,groups:f}=c;c.index&&(o=h.getX(o),u=h.getX(u),l=h.getX(l));let{position:d,normal:p,uv:m,uv1:y}=c.attributes;if(Array.isArray(t)){let g=n*3;for(let _=0,v=f.length;_<v;_++){let{start:x,count:M,materialIndex:A}=f[_];if(g>=x&&g<x+M){let b=Wo(t[A]),T=Go(e,d,p,m,y,o,u,l,b,s,r);if(T)if(T.faceIndex=n,T.face.materialIndex=A,i)i.push(T);else return T}}}else{let g=Wo(t),_=Go(e,d,p,m,y,o,u,l,g,s,r);if(_)if(_.faceIndex=n,_.face.materialIndex=0,i)i.push(_);else return _}return null}function Z(c,t,e,n){let i=c.a,s=c.b,r=c.c,a=t,o=t+1,u=t+2;e&&(a=e.getX(a),o=e.getX(o),u=e.getX(u)),i.x=n.getX(a),i.y=n.getY(a),i.z=n.getZ(a),s.x=n.getX(o),s.y=n.getY(o),s.z=n.getZ(o),r.x=n.getX(u),r.y=n.getY(u),r.z=n.getZ(u)}function Xo(c,t,e,n,i,s,r,a){let{geometry:o,_indirectBuffer:u}=c;for(let l=n,h=n+i;l<h;l++)en(o,t,e,l,s,r,a)}function qo(c,t,e,n,i,s,r){let{geometry:a,_indirectBuffer:o}=c,u=1/0,l=null;for(let h=n,f=n+i;h<f;h++){let d;d=en(a,t,e,h,null,s,r),d&&d.distance<u&&(l=d,u=d.distance)}return l}function Yo(c,t,e,n,i,s,r){let{geometry:a}=e,{index:o}=a,u=a.attributes.position;for(let l=c,h=t+c;l<h;l++){let f;if(f=l,Z(r,f*3,o,u),r.needsUpdate=!0,n(r,f,i,s))return!0}return!1}function Zo(c,t=null){t&&Array.isArray(t)&&(t=new Set(t));let e=c.geometry,n=e.index?e.index.array:null,i=e.attributes.position,s,r,a,o,u=0,l=c._roots;for(let f=0,d=l.length;f<d;f++)s=l[f],r=new Uint32Array(s),a=new Uint16Array(s),o=new Float32Array(s),h(0,u),u+=s.byteLength;function h(f,d,p=!1){let m=f*2;if(O(m,a)){let y=W(f,r),g=q(m,a),_=1/0,v=1/0,x=1/0,M=-1/0,A=-1/0,b=-1/0;for(let T=3*y,C=3*(y+g);T<C;T++){let E=n[T],I=i.getX(E),w=i.getY(E),R=i.getZ(E);I<_&&(_=I),I>M&&(M=I),w<v&&(v=w),w>A&&(A=w),R<x&&(x=R),R>b&&(b=R)}return o[f+0]!==_||o[f+1]!==v||o[f+2]!==x||o[f+3]!==M||o[f+4]!==A||o[f+5]!==b?(o[f+0]=_,o[f+1]=v,o[f+2]=x,o[f+3]=M,o[f+4]=A,o[f+5]=b,!0):!1}else{let y=k(f),g=H(f,r),_=p,v=!1,x=!1;if(t){if(!_){let E=y/8+d/32,I=g/8+d/32;v=t.has(E),x=t.has(I),_=!v&&!x}}else v=!0,x=!0;let M=_||v,A=_||x,b=!1;M&&(b=h(y,d,_));let T=!1;A&&(T=h(g,d,_));let C=b||T;if(C)for(let E=0;E<3;E++){let I=y+E,w=g+E,R=o[I],P=o[I+3],D=o[w],N=o[w+3];o[f+E]=R<D?R:D,o[f+E+3]=P>N?P:N}return C}}}function bt(c,t,e,n,i){let s,r,a,o,u,l,h=1/e.direction.x,f=1/e.direction.y,d=1/e.direction.z,p=e.origin.x,m=e.origin.y,y=e.origin.z,g=t[c],_=t[c+3],v=t[c+1],x=t[c+3+1],M=t[c+2],A=t[c+3+2];return h>=0?(s=(g-p)*h,r=(_-p)*h):(s=(_-p)*h,r=(g-p)*h),f>=0?(a=(v-m)*f,o=(x-m)*f):(a=(x-m)*f,o=(v-m)*f),s>o||a>r||((a>s||isNaN(s))&&(s=a),(o<r||isNaN(r))&&(r=o),d>=0?(u=(M-y)*d,l=(A-y)*d):(u=(A-y)*d,l=(M-y)*d),s>l||u>r)?!1:((u>s||s!==s)&&(s=u),(l<r||r!==r)&&(r=l),s<=i&&r>=n)}function $o(c,t,e,n,i,s,r,a){let{geometry:o,_indirectBuffer:u}=c;for(let l=n,h=n+i;l<h;l++){let f=u?u[l]:l;en(o,t,e,f,s,r,a)}}function Jo(c,t,e,n,i,s,r){let{geometry:a,_indirectBuffer:o}=c,u=1/0,l=null;for(let h=n,f=n+i;h<f;h++){let d;d=en(a,t,e,o?o[h]:h,null,s,r),d&&d.distance<u&&(l=d,u=d.distance)}return l}function Ko(c,t,e,n,i,s,r){let{geometry:a}=e,{index:o}=a,u=a.attributes.position;for(let l=c,h=t+c;l<h;l++){let f;if(f=e.resolveTriangleIndex(l),Z(r,f*3,o,u),r.needsUpdate=!0,n(r,f,i,s))return!0}return!1}function Qo(c,t,e,n,i,s,r){z.setBuffer(c._roots[t]),vr(0,c,e,n,i,s,r),z.clearBuffer()}function vr(c,t,e,n,i,s,r){let{float32Array:a,uint16Array:o,uint32Array:u}=z,l=c*2;if(O(l,o)){let f=W(c,u),d=q(l,o);Xo(t,e,n,f,d,i,s,r)}else{let f=k(c);bt(f,a,n,s,r)&&vr(f,t,e,n,i,s,r);let d=H(c,u);bt(d,a,n,s,r)&&vr(d,t,e,n,i,s,r)}}var _h=["x","y","z"];function jo(c,t,e,n,i,s){z.setBuffer(c._roots[t]);let r=Mr(0,c,e,n,i,s);return z.clearBuffer(),r}function Mr(c,t,e,n,i,s){let{float32Array:r,uint16Array:a,uint32Array:o}=z,u=c*2;if(O(u,a)){let h=W(c,o),f=q(u,a);return qo(t,e,n,h,f,i,s)}else{let h=Ze(c,o),f=_h[h],p=n.direction[f]>=0,m,y;p?(m=k(c),y=H(c,o)):(m=H(c,o),y=k(c));let _=bt(m,r,n,i,s)?Mr(m,t,e,n,i,s):null;if(_){let M=_.point[f];if(p?M<=r[y+h]:M>=r[y+h+3])return _}let x=bt(y,r,n,i,s)?Mr(y,t,e,n,i,s):null;return _&&x?_.distance<=x.distance?_:x:_||x||null}}var Ni=new J,nn=new st,sn=new st,In=new V,ta=new K,Fi=new K;function ea(c,t,e,n){z.setBuffer(c._roots[t]);let i=Sr(0,c,e,n);return z.clearBuffer(),i}function Sr(c,t,e,n,i=null){let{float32Array:s,uint16Array:r,uint32Array:a}=z,o=c*2;if(i===null&&(e.boundingBox||e.computeBoundingBox(),ta.set(e.boundingBox.min,e.boundingBox.max,n),i=ta),O(o,r)){let l=t.geometry,h=l.index,f=l.attributes.position,d=e.index,p=e.attributes.position,m=W(c,a),y=q(o,r);if(In.copy(n).invert(),e.boundsTree)return Y(c,s,Fi),Fi.matrix.copy(In),Fi.needsUpdate=!0,e.boundsTree.shapecast({intersectsBounds:_=>Fi.intersectsBox(_),intersectsTriangle:_=>{_.a.applyMatrix4(n),_.b.applyMatrix4(n),_.c.applyMatrix4(n),_.needsUpdate=!0;for(let v=m*3,x=(y+m)*3;v<x;v+=3)if(Z(sn,v,h,f),sn.needsUpdate=!0,_.intersectsTriangle(sn))return!0;return!1}});{let g=le(e);for(let _=m*3,v=(y+m)*3;_<v;_+=3){Z(nn,_,h,f),nn.a.applyMatrix4(In),nn.b.applyMatrix4(In),nn.c.applyMatrix4(In),nn.needsUpdate=!0;for(let x=0,M=g*3;x<M;x+=3)if(Z(sn,x,d,p),sn.needsUpdate=!0,nn.intersectsTriangle(sn))return!0}}}else{let l=k(c),h=H(c,a);return Y(l,s,Ni),!!(i.intersectsBox(Ni)&&Sr(l,t,e,n,i)||(Y(h,s,Ni),i.intersectsBox(Ni)&&Sr(h,t,e,n,i)))}}var Bi=new V,br=new K,Pn=new K,xh=new S,yh=new S,vh=new S,Mh=new S;function na(c,t,e,n={},i={},s=0,r=1/0){t.boundingBox||t.computeBoundingBox(),br.set(t.boundingBox.min,t.boundingBox.max,e),br.needsUpdate=!0;let a=c.geometry,o=a.attributes.position,u=a.index,l=t.attributes.position,h=t.index,f=ft.getPrimitive(),d=ft.getPrimitive(),p=xh,m=yh,y=null,g=null;i&&(y=vh,g=Mh);let _=1/0,v=null,x=null;return Bi.copy(e).invert(),Pn.matrix.copy(Bi),c.shapecast({boundsTraverseOrder:M=>br.distanceToBox(M),intersectsBounds:(M,A,b)=>b<_&&b<r?(A&&(Pn.min.copy(M.min),Pn.max.copy(M.max),Pn.needsUpdate=!0),!0):!1,intersectsRange:(M,A)=>{if(t.boundsTree)return t.boundsTree.shapecast({boundsTraverseOrder:T=>Pn.distanceToBox(T),intersectsBounds:(T,C,E)=>E<_&&E<r,intersectsRange:(T,C)=>{for(let E=T,I=T+C;E<I;E++){Z(d,3*E,h,l),d.a.applyMatrix4(e),d.b.applyMatrix4(e),d.c.applyMatrix4(e),d.needsUpdate=!0;for(let w=M,R=M+A;w<R;w++){Z(f,3*w,u,o),f.needsUpdate=!0;let P=f.distanceToTriangle(d,p,y);if(P<_&&(m.copy(p),g&&g.copy(y),_=P,v=w,x=E),P<s)return!0}}}});{let b=le(t);for(let T=0,C=b;T<C;T++){Z(d,3*T,h,l),d.a.applyMatrix4(e),d.b.applyMatrix4(e),d.c.applyMatrix4(e),d.needsUpdate=!0;for(let E=M,I=M+A;E<I;E++){Z(f,3*E,u,o),f.needsUpdate=!0;let w=f.distanceToTriangle(d,p,y);if(w<_&&(m.copy(p),g&&g.copy(y),_=w,v=E,x=T),w<s)return!0}}}}}),ft.releasePrimitive(f),ft.releasePrimitive(d),_===1/0?null:(n.point?n.point.copy(m):n.point=m.clone(),n.distance=_,n.faceIndex=v,i&&(i.point?i.point.copy(g):i.point=g.clone(),i.point.applyMatrix4(Bi),m.applyMatrix4(Bi),i.distance=m.sub(i.point).length(),i.faceIndex=x),n)}function ia(c,t=null){t&&Array.isArray(t)&&(t=new Set(t));let e=c.geometry,n=e.index?e.index.array:null,i=e.attributes.position,s,r,a,o,u=0,l=c._roots;for(let f=0,d=l.length;f<d;f++)s=l[f],r=new Uint32Array(s),a=new Uint16Array(s),o=new Float32Array(s),h(0,u),u+=s.byteLength;function h(f,d,p=!1){let m=f*2;if(O(m,a)){let y=W(f,r),g=q(m,a),_=1/0,v=1/0,x=1/0,M=-1/0,A=-1/0,b=-1/0;for(let T=y,C=y+g;T<C;T++){let E=3*c.resolveTriangleIndex(T);for(let I=0;I<3;I++){let w=E+I;w=n?n[w]:w;let R=i.getX(w),P=i.getY(w),D=i.getZ(w);R<_&&(_=R),R>M&&(M=R),P<v&&(v=P),P>A&&(A=P),D<x&&(x=D),D>b&&(b=D)}}return o[f+0]!==_||o[f+1]!==v||o[f+2]!==x||o[f+3]!==M||o[f+4]!==A||o[f+5]!==b?(o[f+0]=_,o[f+1]=v,o[f+2]=x,o[f+3]=M,o[f+4]=A,o[f+5]=b,!0):!1}else{let y=k(f),g=H(f,r),_=p,v=!1,x=!1;if(t){if(!_){let E=y/8+d/32,I=g/8+d/32;v=t.has(E),x=t.has(I),_=!v&&!x}}else v=!0,x=!0;let M=_||v,A=_||x,b=!1;M&&(b=h(y,d,_));let T=!1;A&&(T=h(g,d,_));let C=b||T;if(C)for(let E=0;E<3;E++){let I=y+E,w=g+E,R=o[I],P=o[I+3],D=o[w],N=o[w+3];o[f+E]=R<D?R:D,o[f+E+3]=P>N?P:N}return C}}}function sa(c,t,e,n,i,s,r){z.setBuffer(c._roots[t]),Tr(0,c,e,n,i,s,r),z.clearBuffer()}function Tr(c,t,e,n,i,s,r){let{float32Array:a,uint16Array:o,uint32Array:u}=z,l=c*2;if(O(l,o)){let f=W(c,u),d=q(l,o);$o(t,e,n,f,d,i,s,r)}else{let f=k(c);bt(f,a,n,s,r)&&Tr(f,t,e,n,i,s,r);let d=H(c,u);bt(d,a,n,s,r)&&Tr(d,t,e,n,i,s,r)}}var Sh=["x","y","z"];function ra(c,t,e,n,i,s){z.setBuffer(c._roots[t]);let r=Ar(0,c,e,n,i,s);return z.clearBuffer(),r}function Ar(c,t,e,n,i,s){let{float32Array:r,uint16Array:a,uint32Array:o}=z,u=c*2;if(O(u,a)){let h=W(c,o),f=q(u,a);return Jo(t,e,n,h,f,i,s)}else{let h=Ze(c,o),f=Sh[h],p=n.direction[f]>=0,m,y;p?(m=k(c),y=H(c,o)):(m=H(c,o),y=k(c));let _=bt(m,r,n,i,s)?Ar(m,t,e,n,i,s):null;if(_){let M=_.point[f];if(p?M<=r[y+h]:M>=r[y+h+3])return _}let x=bt(y,r,n,i,s)?Ar(y,t,e,n,i,s):null;return _&&x?_.distance<=x.distance?_:x:_||x||null}}var Oi=new J,rn=new st,on=new st,Ln=new V,oa=new K,zi=new K;function aa(c,t,e,n){z.setBuffer(c._roots[t]);let i=Er(0,c,e,n);return z.clearBuffer(),i}function Er(c,t,e,n,i=null){let{float32Array:s,uint16Array:r,uint32Array:a}=z,o=c*2;if(i===null&&(e.boundingBox||e.computeBoundingBox(),oa.set(e.boundingBox.min,e.boundingBox.max,n),i=oa),O(o,r)){let l=t.geometry,h=l.index,f=l.attributes.position,d=e.index,p=e.attributes.position,m=W(c,a),y=q(o,r);if(Ln.copy(n).invert(),e.boundsTree)return Y(c,s,zi),zi.matrix.copy(Ln),zi.needsUpdate=!0,e.boundsTree.shapecast({intersectsBounds:_=>zi.intersectsBox(_),intersectsTriangle:_=>{_.a.applyMatrix4(n),_.b.applyMatrix4(n),_.c.applyMatrix4(n),_.needsUpdate=!0;for(let v=m,x=y+m;v<x;v++)if(Z(on,3*t.resolveTriangleIndex(v),h,f),on.needsUpdate=!0,_.intersectsTriangle(on))return!0;return!1}});{let g=le(e);for(let _=m,v=y+m;_<v;_++){let x=t.resolveTriangleIndex(_);Z(rn,3*x,h,f),rn.a.applyMatrix4(Ln),rn.b.applyMatrix4(Ln),rn.c.applyMatrix4(Ln),rn.needsUpdate=!0;for(let M=0,A=g*3;M<A;M+=3)if(Z(on,M,d,p),on.needsUpdate=!0,rn.intersectsTriangle(on))return!0}}}else{let l=k(c),h=H(c,a);return Y(l,s,Oi),!!(i.intersectsBox(Oi)&&Er(l,t,e,n,i)||(Y(h,s,Oi),i.intersectsBox(Oi)&&Er(h,t,e,n,i)))}}var Vi=new V,wr=new K,Dn=new K,bh=new S,Th=new S,Ah=new S,Eh=new S;function ca(c,t,e,n={},i={},s=0,r=1/0){t.boundingBox||t.computeBoundingBox(),wr.set(t.boundingBox.min,t.boundingBox.max,e),wr.needsUpdate=!0;let a=c.geometry,o=a.attributes.position,u=a.index,l=t.attributes.position,h=t.index,f=ft.getPrimitive(),d=ft.getPrimitive(),p=bh,m=Th,y=null,g=null;i&&(y=Ah,g=Eh);let _=1/0,v=null,x=null;return Vi.copy(e).invert(),Dn.matrix.copy(Vi),c.shapecast({boundsTraverseOrder:M=>wr.distanceToBox(M),intersectsBounds:(M,A,b)=>b<_&&b<r?(A&&(Dn.min.copy(M.min),Dn.max.copy(M.max),Dn.needsUpdate=!0),!0):!1,intersectsRange:(M,A)=>{if(t.boundsTree){let b=t.boundsTree;return b.shapecast({boundsTraverseOrder:T=>Dn.distanceToBox(T),intersectsBounds:(T,C,E)=>E<_&&E<r,intersectsRange:(T,C)=>{for(let E=T,I=T+C;E<I;E++){let w=b.resolveTriangleIndex(E);Z(d,3*w,h,l),d.a.applyMatrix4(e),d.b.applyMatrix4(e),d.c.applyMatrix4(e),d.needsUpdate=!0;for(let R=M,P=M+A;R<P;R++){let D=c.resolveTriangleIndex(R);Z(f,3*D,u,o),f.needsUpdate=!0;let N=f.distanceToTriangle(d,p,y);if(N<_&&(m.copy(p),g&&g.copy(y),_=N,v=R,x=E),N<s)return!0}}}})}else{let b=le(t);for(let T=0,C=b;T<C;T++){Z(d,3*T,h,l),d.a.applyMatrix4(e),d.b.applyMatrix4(e),d.c.applyMatrix4(e),d.needsUpdate=!0;for(let E=M,I=M+A;E<I;E++){let w=c.resolveTriangleIndex(E);Z(f,3*w,u,o),f.needsUpdate=!0;let R=f.distanceToTriangle(d,p,y);if(R<_&&(m.copy(p),g&&g.copy(y),_=R,v=E,x=T),R<s)return!0}}}}}),ft.releasePrimitive(f),ft.releasePrimitive(d),_===1/0?null:(n.point?n.point.copy(m):n.point=m.clone(),n.distance=_,n.faceIndex=v,i&&(i.point?i.point.copy(g):i.point=g.clone(),i.point.applyMatrix4(Vi),m.applyMatrix4(Vi),i.distance=m.sub(i.point).length(),i.faceIndex=x),n)}function Cr(c,t,e){return c===null?null:(c.point.applyMatrix4(t.matrixWorld),c.distance=c.point.distanceTo(e.ray.origin),c.object=t,c)}var ki=new K,Hi=new Lt,la=new S,ua=new V,ha=new S,Rr=["getX","getY","getZ"],Gi=class c extends Ii{static serialize(t,e={}){e={cloneBuffers:!0,...e};let n=t.geometry,i=t._roots,s=t._indirectBuffer,r=n.getIndex(),a={version:1,roots:null,index:null,indirectBuffer:null};return e.cloneBuffers?(a.roots=i.map(o=>o.slice()),a.index=r?r.array.slice():null,a.indirectBuffer=s?s.slice():null):(a.roots=i,a.index=r?r.array:null,a.indirectBuffer=s),a}static deserialize(t,e,n={}){n={setIndex:!0,indirect:!!t.indirectBuffer,...n};let{index:i,roots:s,indirectBuffer:r}=t;t.version||(console.warn("MeshBVH.deserialize: Serialization format has been changed and will be fixed up. It is recommended to regenerate any stored serialized data."),o(s));let a=new c(e,{...n,[bn]:!0});if(a._roots=s,a._indirectBuffer=r||null,n.setIndex){let u=e.getIndex();if(u===null){let l=new Q(t.index,1,!1);e.setIndex(l)}else u.array!==i&&(u.array.set(i),u.needsUpdate=!0)}return a;function o(u){for(let l=0;l<u.length;l++){let h=u[l],f=new Uint32Array(h),d=new Uint16Array(h);for(let p=0,m=h.byteLength/32;p<m;p++){let y=8*p,g=2*y;O(g,d)||(f[y+6]=f[y+6]/8-p)}}}}get primitiveStride(){return 3}get resolveTriangleIndex(){return this.resolvePrimitiveIndex}constructor(t,e={}){e.maxLeafTris&&(console.warn('MeshBVH: "maxLeafTris" option has been deprecated. Use "targetLeafSize", instead.'),e={...e,targetLeafSize:e.maxLeafTris}),super(t,e)}shiftTriangleOffsets(t){return super.shiftPrimitiveOffsets(t)}writePrimitiveBounds(t,e,n){let i=this.geometry,s=this._indirectBuffer,r=i.attributes.position,a=i.index?i.index.array:null,u=(s?s[t]:t)*3,l=u+0,h=u+1,f=u+2;a&&(l=a[l],h=a[h],f=a[f]);for(let d=0;d<3;d++){let p=r[Rr[d]](l),m=r[Rr[d]](h),y=r[Rr[d]](f),g=p;m<g&&(g=m),y<g&&(g=y);let _=p;m>_&&(_=m),y>_&&(_=y),e[n+d]=g,e[n+d+3]=_}return e}computePrimitiveBounds(t,e,n){let i=this.geometry,s=this._indirectBuffer,r=i.attributes.position,a=i.index?i.index.array:null,o=r.normalized;if(t<0||e+t-n.offset>n.length/6)throw new Error("MeshBVH: compute triangle bounds range is invalid.");let u=r.array,l=r.offset||0,h=3;r.isInterleavedBufferAttribute&&(h=r.data.stride);let f=["getX","getY","getZ"],d=n.offset;for(let p=t,m=t+e;p<m;p++){let g=(s?s[p]:p)*3,_=(p-d)*6,v=g+0,x=g+1,M=g+2;a&&(v=a[v],x=a[x],M=a[M]),o||(v=v*h+l,x=x*h+l,M=M*h+l);for(let A=0;A<3;A++){let b,T,C;o?(b=r[f[A]](v),T=r[f[A]](x),C=r[f[A]](M)):(b=u[v+A],T=u[x+A],C=u[M+A]);let E=b;T<E&&(E=T),C<E&&(E=C);let I=b;T>I&&(I=T),C>I&&(I=C);let w=(I-E)/2,R=A*2;n[_+R+0]=E+w,n[_+R+1]=w+(Math.abs(E)+w)*qe}}return n}raycastObject3D(t,e,n=[]){let{material:i}=t;if(i===void 0)return;ua.copy(t.matrixWorld).invert(),Hi.copy(e.ray).applyMatrix4(ua),ha.setFromMatrixScale(t.matrixWorld),la.copy(Hi.direction).multiply(ha);let s=la.length(),r=e.near/s,a=e.far/s;if(e.firstHitOnly===!0){let o=this.raycastFirst(Hi,i,r,a);o=Cr(o,t,e),o&&n.push(o)}else{let o=this.raycast(Hi,i,r,a);for(let u=0,l=o.length;u<l;u++){let h=Cr(o[u],t,e);h&&n.push(h)}}return n}refit(t=null){return(this.indirect?ia:Zo)(this,t)}raycast(t,e=_e,n=0,i=1/0){let s=this._roots,r=[],a=this.indirect?sa:Qo;for(let o=0,u=s.length;o<u;o++)a(this,o,e,t,r,n,i);return r}raycastFirst(t,e=_e,n=0,i=1/0){let s=this._roots,r=null,a=this.indirect?ra:jo;for(let o=0,u=s.length;o<u;o++){let l=a(this,o,e,t,n,i);l!=null&&(r==null||l.distance<r.distance)&&(r=l)}return r}intersectsGeometry(t,e){let n=!1,i=this._roots,s=this.indirect?aa:ea;for(let r=0,a=i.length;r<a&&(n=s(this,r,t,e),!n);r++);return n}shapecast(t){let e=ft.getPrimitive(),n=super.shapecast({...t,intersectsPrimitive:t.intersectsTriangle,scratchPrimitive:e,iterate:this.indirect?Ko:Yo});return ft.releasePrimitive(e),n}bvhcast(t,e,n){let{intersectsRanges:i,intersectsTriangles:s}=n,r=ft.getPrimitive(),a=this.geometry.index,o=this.geometry.attributes.position,u=this.indirect?p=>{let m=this.resolveTriangleIndex(p);Z(r,m*3,a,o)}:p=>{Z(r,p*3,a,o)},l=ft.getPrimitive(),h=t.geometry.index,f=t.geometry.attributes.position,d=t.indirect?p=>{let m=t.resolveTriangleIndex(p);Z(l,m*3,h,f)}:p=>{Z(l,p*3,h,f)};if(s){if(!(t instanceof c))throw new Error('MeshBVH: "intersectsTriangles" callback can only be used with another MeshBVH.');let p=(m,y,g,_,v,x,M,A)=>{for(let b=g,T=g+_;b<T;b++){d(b),l.a.applyMatrix4(e),l.b.applyMatrix4(e),l.c.applyMatrix4(e),l.needsUpdate=!0;for(let C=m,E=m+y;C<E;C++)if(u(C),r.needsUpdate=!0,s(r,l,C,b,v,x,M,A))return!0}return!1};if(i){let m=i;i=function(y,g,_,v,x,M,A,b){return m(y,g,_,v,x,M,A,b)?!0:p(y,g,_,v,x,M,A,b)}}else i=p}return super.bvhcast(t,e,{intersectsRanges:i})}intersectsBox(t,e){return ki.set(t.min,t.max,e),ki.needsUpdate=!0,this.shapecast({intersectsBounds:n=>ki.intersectsBox(n),intersectsTriangle:n=>ki.intersectsTriangle(n)})}intersectsSphere(t){return this.shapecast({intersectsBounds:e=>t.intersectsBox(e),intersectsTriangle:e=>e.intersectsSphere(t)})}closestPointToGeometry(t,e,n={},i={},s=0,r=1/0){return(this.indirect?ca:na)(this,t,e,n,i,s,r)}closestPointToPoint(t,e={},n=0,i=1/0){return zo(this,t,e,n,i)}};var fa=Math.pow(10,-Math.log10(1e-6)),wh=5e-7*fa;function Rt(c){return~~(c*fa+wh)}function da(c){return`${Rt(c.x)},${Rt(c.y)}`}function Ir(c){return`${Rt(c.x)},${Rt(c.y)},${Rt(c.z)}`}function pa(c){return`${Rt(c.x)},${Rt(c.y)},${Rt(c.z)},${Rt(c.w)}`}function ma(c,t,e){e.direction.subVectors(t,c).normalize();let n=c.dot(e.direction);return e.origin.copy(c).addScaledVector(e.direction,-n),e}function Wi(){return typeof SharedArrayBuffer<"u"}function ga(c){if(c.buffer instanceof SharedArrayBuffer)return c;let t=c.constructor,e=c.buffer,n=new SharedArrayBuffer(e.byteLength),i=new Uint8Array(e);return new Uint8Array(n).set(i,0),new t(n)}function Ch(c,t=ArrayBuffer){return c>65535?new Uint32Array(new t(4*c)):new Uint16Array(new t(2*c))}function _a(c,t){if(!c.index){let e=c.attributes.position.count,n=t.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,i=Ch(e,n);c.setIndex(new Q(i,1));for(let s=0;s<e;s++)i[s]=s}}function Rh(c){return c.index?c.index.count:c.attributes.position.count}function an(c){return Rh(c)/3}var Ih=1e-8,Ph=new S;function ya(c){return~~(c/3)}function va(c){return c%3}function xa(c,t){return c.start-t.start}function Pr(c,t){return Ph.subVectors(t,c.origin).dot(c.direction)}function Ma(c,t,e,n=Ih){c.sort(xa),t.sort(xa);for(let a=0;a<c.length;a++){let o=c[a];for(let u=0;u<t.length;u++){let l=t[u];if(!(l.start>o.end)){if(o.end<l.start||l.end<o.start)continue;if(o.start<=l.start&&o.end>=l.end)s(l.end,o.end)||c.splice(a+1,0,{start:l.end,end:o.end,index:o.index}),o.end=l.start,l.start=0,l.end=0;else if(o.start>=l.start&&o.end<=l.end)s(o.end,l.end)||t.splice(u+1,0,{start:o.end,end:l.end,index:l.index}),l.end=o.start,o.start=0,o.end=0;else if(o.start<=l.start&&o.end<=l.end){let h=o.end;o.end=l.start,l.start=h}else if(o.start>=l.start&&o.end>=l.end){let h=l.end;l.end=o.start,o.start=h}else throw new Error}if(e.has(o.index)||e.set(o.index,[]),e.has(l.index)||e.set(l.index,[]),e.get(o.index).push(l.index),e.get(l.index).push(o.index),r(l)&&(t.splice(u,1),u--),r(o)){c.splice(a,1),a--;break}}}i(c),i(t);function i(a){for(let o=0;o<a.length;o++)r(a[o])&&(a.splice(o,1),o--)}function s(a,o){return Math.abs(o-a)<n}function r(a){return Math.abs(a.end-a.start)<n}}var Xi=class{constructor(){this._rays=[]}addRay(t){this._rays.push(t)}findClosestRay(t){let e=this._rays,n=t.clone();n.direction.multiplyScalar(-1);let i=1/0,s=null;for(let o=0,u=e.length;o<u;o++){let l=e[o];if(r(l,t)&&r(l,n))continue;let h=a(l,t),f=a(l,n),d=Math.min(h,f);d<i&&(i=d,s=l)}return s;function r(o,u){let l=o.origin.distanceTo(u.origin)>1e-5;return o.direction.angleTo(u.direction)>1e-4||l}function a(o,u){let l=o.origin.distanceTo(u.origin),h=o.direction.angleTo(u.direction);return l/1e-5+h/1e-4}}};var Lr=new S,Dr=new S,qi=new Lt;function Sa(c,t,e){let n=c.attributes,i=c.index,s=n.position,r=new Map,a=new Map,o=Array.from(t),u=new Xi;for(let l=0,h=o.length;l<h;l++){let f=o[l],d=ya(f),p=va(f),m=3*d+p,y=3*d+(p+1)%3;i&&(m=i.getX(m),y=i.getX(y)),Lr.fromBufferAttribute(s,m),Dr.fromBufferAttribute(s,y),ma(Lr,Dr,qi);let g,_=u.findClosestRay(qi);_===null&&(_=qi.clone(),u.addRay(_)),a.has(_)||a.set(_,{forward:[],reverse:[],ray:_}),g=a.get(_);let v=Pr(_,Lr),x=Pr(_,Dr);v>x&&([v,x]=[x,v]),qi.direction.dot(_.direction)<0?g.reverse.push({start:v,end:x,index:f}):g.forward.push({start:v,end:x,index:f})}return a.forEach(({forward:l,reverse:h},f)=>{Ma(l,h,r,e),l.length===0&&h.length===0&&a.delete(f)}),{disjointConnectivityMap:r,fragmentMap:a}}var Lh=new G,Ur=new S,Dh=new ut,Nr=["","",""],Yi=class{constructor(t=null){this.data=null,this.disjointConnections=null,this.unmatchedDisjointEdges=null,this.unmatchedEdges=-1,this.matchedEdges=-1,this.useDrawRange=!0,this.useAllAttributes=!1,this.matchDisjointEdges=!1,this.degenerateEpsilon=1e-8,t&&this.updateFrom(t)}getSiblingTriangleIndex(t,e){let n=this.data[t*3+e];return n===-1?-1:~~(n/3)}getSiblingEdgeIndex(t,e){let n=this.data[t*3+e];return n===-1?-1:n%3}getDisjointSiblingTriangleIndices(t,e){let n=t*3+e,i=this.disjointConnections.get(n);return i?i.map(s=>~~(s/3)):[]}getDisjointSiblingEdgeIndices(t,e){let n=t*3+e,i=this.disjointConnections.get(n);return i?i.map(s=>s%3):[]}isFullyConnected(){return this.unmatchedEdges===0}updateFrom(t){let{useAllAttributes:e,useDrawRange:n,matchDisjointEdges:i,degenerateEpsilon:s}=this,r=e?v:_,a=new Map,{attributes:o}=t,u=e?Object.keys(o):null,l=t.index,h=o.position,f=an(t),d=f,p=0;n&&(p=t.drawRange.start,t.drawRange.count!==1/0&&(f=~~(t.drawRange.count/3)));let m=this.data;(!m||m.length<3*d)&&(m=new Int32Array(3*d)),m.fill(-1);let y=0,g=new Set;for(let x=p,M=f*3+p;x<M;x+=3){let A=x;for(let b=0;b<3;b++){let T=A+b;l&&(T=l.getX(T)),Nr[b]=r(T)}for(let b=0;b<3;b++){let T=(b+1)%3,C=Nr[b],E=Nr[T],I=`${E}_${C}`;if(a.has(I)){let w=A+b,R=a.get(I);m[w]=R,m[R]=w,a.delete(I),y+=2,g.delete(R)}else{let w=`${C}_${E}`,R=A+b;a.set(w,R),g.add(R)}}}if(i){let{fragmentMap:x,disjointConnectivityMap:M}=Sa(t,g,s);g.clear(),x.forEach(({forward:A,reverse:b})=>{A.forEach(({index:T})=>g.add(T)),b.forEach(({index:T})=>g.add(T))}),this.unmatchedDisjointEdges=x,this.disjointConnections=M,y=f*3-g.size}this.matchedEdges=y,this.unmatchedEdges=g.size,this.data=m;function _(x){return Ur.fromBufferAttribute(h,x),Ir(Ur)}function v(x){let M="";for(let A=0,b=u.length;A<b;A++){let T=o[u[A]],C;switch(T.itemSize){case 1:C=Rt(T.getX(x));break;case 2:C=da(Lh.fromBufferAttribute(T,x));break;case 3:C=Ir(Ur.fromBufferAttribute(T,x));break;case 4:C=pa(Dh.fromBufferAttribute(T,x));break}M!==""&&(M+="|"),M+=C}return M}}};var Dt=class extends yn{constructor(...t){super(...t),this.isBrush=!0,this._previousMatrix=new V,this._previousMatrix.elements.fill(0)}markUpdated(){this._previousMatrix.copy(this.matrix)}isDirty(){let{matrix:t,_previousMatrix:e}=this,n=t.elements,i=e.elements;for(let s=0;s<16;s++)if(n[s]!==i[s])return!0;return!1}prepareGeometry(){let t=this.geometry,e=t.attributes,n=Wi();if(n)for(let i in e){let s=e[i];if(s.isInterleavedBufferAttribute)throw new Error("Brush: InterleavedBufferAttributes are not supported.");s.array=ga(s.array)}if(t.boundsTree||(_a(t,{useSharedArrayBuffer:n}),t.boundsTree=new Gi(t,{maxLeafTris:3,indirect:!0,useSharedArrayBuffer:n})),t.halfEdges||(t.halfEdges=new Yi(t)),!t.groupIndices){let i=an(t),s=new Uint16Array(i),r=t.groups;for(let a=0,o=r.length;a<o;a++){let{start:u,count:l}=r[a];for(let h=u/3,f=(u+l)/3;h<f;h++)s[h]=a}t.groupIndices=s}}disposeCacheData(){let{geometry:t}=this;t.halfEdges=null,t.boundsTree=null,t.groupIndices=null}};var Uh=1e-14,Fr=new S,ba=new S,Ta=new S;function It(c,t=Uh){Fr.subVectors(c.b,c.a),ba.subVectors(c.c,c.a),Ta.subVectors(c.b,c.c);let e=Fr.angleTo(ba),n=Fr.angleTo(Ta),i=Math.PI-e-n;return Math.abs(e)<t||Math.abs(n)<t||Math.abs(i)<t||c.a.distanceToSquared(c.b)<t||c.a.distanceToSquared(c.c)<t||c.b.distanceToSquared(c.c)<t}var Br=1e-10,Un=1e-10,Nh=1e-10,Xt=new nt,j=new nt,qt=new S,Or=new S,Aa=new S,Zi=new Ht,zr=new st,Vr=class{constructor(){this._pool=[],this._index=0}getTriangle(){return this._index>=this._pool.length&&this._pool.push(new X),this._pool[this._index++]}clear(){this._index=0}reset(){this._pool.length=0,this._index=0}},$i=class{constructor(){this.trianglePool=new Vr,this.triangles=[],this.normal=new S,this.coplanarTriangleUsed=!1}initialize(t){this.reset();let{triangles:e,trianglePool:n,normal:i}=this;if(Array.isArray(t))for(let s=0,r=t.length;s<r;s++){let a=t[s];if(s===0)a.getNormal(i);else if(Math.abs(1-a.getNormal(qt).dot(i))>Br)throw new Error("Triangle Splitter: Cannot initialize with triangles that have different normals.");let o=n.getTriangle();o.copy(a),e.push(o)}else{t.getNormal(i);let s=n.getTriangle();s.copy(t),e.push(s)}}splitByTriangle(t){let{normal:e,triangles:n}=this;if(t.getNormal(Or).normalize(),Math.abs(1-Math.abs(Or.dot(e)))<Nh){this.coplanarTriangleUsed=!0;for(let s=0,r=n.length;s<r;s++){let a=n[s];a.coplanarCount=0}let i=[t.a,t.b,t.c];for(let s=0;s<3;s++){let r=(s+1)%3,a=i[s],o=i[r];qt.subVectors(o,a).normalize(),Aa.crossVectors(Or,qt),Zi.setFromNormalAndCoplanarPoint(Aa,a),this.splitByPlane(Zi,t)}}else t.getPlane(Zi),this.splitByPlane(Zi,t)}splitByPlane(t,e){let{triangles:n,trianglePool:i}=this;zr.copy(e),zr.needsUpdate=!0;for(let s=0,r=n.length;s<r;s++){let a=n[s];if(!zr.intersectsTriangle(a,Xt,!0))continue;let{a:o,b:u,c:l}=a,h=0,f=-1,d=!1,p=[],m=[],y=[o,u,l];for(let g=0;g<3;g++){let _=(g+1)%3;Xt.start.copy(y[g]),Xt.end.copy(y[_]);let v=t.distanceToPoint(Xt.start),x=t.distanceToPoint(Xt.end);if(Math.abs(v)<Un&&Math.abs(x)<Un){d=!0;break}if(v>0?p.push(g):m.push(g),Math.abs(v)<Un)continue;let M=!!t.intersectLine(Xt,qt);!M&&Math.abs(x)<Un&&(qt.copy(Xt.end),M=!0),M&&!(qt.distanceTo(Xt.start)<Br)&&(qt.distanceTo(Xt.end)<Br&&(f=g),h===0?j.start.copy(qt):j.end.copy(qt),h++)}if(!d&&h===2&&j.distance()>Un)if(f!==-1){f=(f+1)%3;let g=0;g===f&&(g=(g+1)%3);let _=g+1;_===f&&(_=(_+1)%3);let v=i.getTriangle();v.a.copy(y[_]),v.b.copy(j.end),v.c.copy(j.start),It(v)||n.push(v),a.a.copy(y[g]),a.b.copy(j.start),a.c.copy(j.end),It(a)&&(n.splice(s,1),s--,r--)}else{let g=p.length>=2?m[0]:p[0];if(g===0){let A=j.start;j.start=j.end,j.end=A}let _=(g+1)%3,v=(g+2)%3,x=i.getTriangle(),M=i.getTriangle();y[_].distanceToSquared(j.start)<y[v].distanceToSquared(j.end)?(x.a.copy(y[_]),x.b.copy(j.start),x.c.copy(j.end),M.a.copy(y[_]),M.b.copy(y[v]),M.c.copy(j.start)):(x.a.copy(y[v]),x.b.copy(j.start),x.c.copy(j.end),M.a.copy(y[_]),M.b.copy(y[v]),M.c.copy(j.end)),a.a.copy(y[g]),a.b.copy(j.end),a.c.copy(j.start),It(x)||n.push(x),It(M)||n.push(M),It(a)&&(n.splice(s,1),s--,r--)}else h===3&&console.warn("TriangleClipper: Coplanar clip not handled")}}reset(){this.triangles.length=0,this.trianglePool.clear(),this.coplanarTriangleUsed=!1}};function Fh(c){return c=~~c,c+4-c%4}var Nn=class{constructor(t,e=500){this.expansionFactor=1.5,this.type=t,this.length=0,this.array=null,this.setSize(e)}setType(t){if(this.length!==0)throw new Error("TypeBackedArray: Cannot change the type while there is used data in the buffer.");let e=this.array.buffer;this.array=new t(e),this.type=t}setSize(t){if(this.array&&t===this.array.length)return;let e=this.type,n=Wi()?SharedArrayBuffer:ArrayBuffer,i=new e(new n(Fh(t*e.BYTES_PER_ELEMENT)));this.array&&i.set(this.array,0),this.array=i}expand(){let{array:t,expansionFactor:e}=this;this.setSize(t.length*e)}push(...t){let{array:e,length:n}=this;n+t.length>e.length&&(this.expand(),e=this.array);for(let i=0,s=t.length;i<s;i++)e[n+i]=t[i];this.length+=t.length}clear(){this.length=0}};var Ji=class{constructor(){this.groupAttributes=[{}],this.groupCount=0}getType(t){return this.groupAttributes[0][t].type}getItemSize(t){return this.groupAttributes[0][t].itemSize}getNormalized(t){return this.groupAttributes[0][t].normalized}getCount(t){if(this.groupCount<=t)return 0;let e=this.getGroupAttrArray("position",t);return e.length/e.itemSize}getTotalLength(t){let{groupCount:e,groupAttributes:n}=this,i=0;for(let s=0;s<e;s++){let r=n[s];i+=r[t].length}return i}getGroupAttrSet(t=0){let{groupAttributes:e}=this;if(e[t])return this.groupCount=Math.max(this.groupCount,t+1),e[t];let n=e[0];for(this.groupCount=Math.max(this.groupCount,t+1);t>=e.length;){let i={};e.push(i);for(let s in n){let r=n[s],a=new Nn(r.type);a.itemSize=r.itemSize,a.normalized=r.normalized,i[s]=a}}return e[t]}getGroupAttrArray(t,e=0){let{groupAttributes:n}=this;if(!n[0][t])throw new Error(`TypedAttributeData: Attribute with "${t}" has not been initialized`);return this.getGroupAttrSet(e)[t]}initializeArray(t,e,n,i){let{groupAttributes:s}=this,a=s[0][t];if(a){if(a.type!==e)for(let o=0,u=s.length;o<u;o++){let l=s[o][t];l.setType(e),l.itemSize=n,l.normalized=i}}else for(let o=0,u=s.length;o<u;o++){let l=new Nn(e);l.itemSize=n,l.normalized=i,s[o][t]=l}}clear(){this.groupCount=0;let{groupAttributes:t}=this;t.forEach(e=>{for(let n in e)e[n].clear()})}delete(t){this.groupAttributes.forEach(e=>{delete e[t]})}reset(){this.groupAttributes=[],this.groupCount=0}};var Fn=class{constructor(){this.intersectionSet={},this.ids=[]}add(t,e){let{intersectionSet:n,ids:i}=this;n[t]||(n[t]=[],i.push(t)),n[t].push(e)}};var Tt=new Lt,Ea=new V,dt=new X,Yt=new S,wa=new ut,Ca=new ut,Ra=new ut,kr=new ut,Ki=new ut,Qi=new ut,Ia=new nt,Hr=new S,Gr=1e-8,zh=1e-15,Ee=-1,we=1,ji=-2,ts=2,cn=0,Ae=1,ns=2,Vh=1e-14,es=null;function qr(c){es=c}function Yr(c,t){c.getMidpoint(Tt.origin),c.getNormal(Tt.direction);let e=t.raycastFirst(Tt,We);return!!(e&&Tt.direction.dot(e.face.normal)>0)?Ee:we}function Da(c,t){function e(){return Math.random()-.5}c.getNormal(Hr),Tt.direction.copy(Hr),c.getMidpoint(Tt.origin);let n=3,i=0,s=1/0;for(let r=0;r<n;r++){Tt.direction.x+=e()*Gr,Tt.direction.y+=e()*Gr,Tt.direction.z+=e()*Gr,Tt.direction.multiplyScalar(-1);let a=t.raycastFirst(Tt,We);if(!!(a&&Tt.direction.dot(a.face.normal)>0)&&i++,a!==null&&(s=Math.min(s,a.distance)),s<=zh)return a.face.normal.dot(Hr)>0?ts:ji;if(i/n>.5||(r-i+1)/n>.5)break}return i/n>.5?Ee:we}function Ua(c,t){let e=new Fn,n=new Fn;return Ea.copy(c.matrixWorld).invert().multiply(t.matrixWorld),c.geometry.boundsTree.bvhcast(t.geometry.boundsTree,Ea,{intersectsTriangles(i,s,r,a){if(!It(i)&&!It(s)){let o=i.intersectsTriangle(s,Ia,!0);if(!o){let u=i.plane,l=s.plane,h=u.normal,f=l.normal;h.dot(f)===1&&Math.abs(u.constant-l.constant)<Vh&&(o=!0)}if(o){let u=c.geometry.boundsTree.resolveTriangleIndex(r),l=t.geometry.boundsTree.resolveTriangleIndex(a);e.add(u,l),n.add(l,u),es&&(es.addEdge(Ia),es.addIntersectingTriangles(r,i,a,s))}}return!1}}),{aIntersections:e,bIntersections:n}}function Na(c,t,e,n,i,s,r=!1){let a=e.attributes,o=e.index,u=c*3,l=o.getX(u+0),h=o.getX(u+1),f=o.getX(u+2);for(let d in s){let p=a[d],m=s[d];if(!(d in a))throw new Error(`CSG Operations: Attribute ${d} not available on geometry.`);let y=p.itemSize;d==="position"?(dt.a.fromBufferAttribute(p,l).applyMatrix4(n),dt.b.fromBufferAttribute(p,h).applyMatrix4(n),dt.c.fromBufferAttribute(p,f).applyMatrix4(n),Wr(dt.a,dt.b,dt.c,t,3,m,r)):d==="normal"?(dt.a.fromBufferAttribute(p,l).applyNormalMatrix(i),dt.b.fromBufferAttribute(p,h).applyNormalMatrix(i),dt.c.fromBufferAttribute(p,f).applyNormalMatrix(i),r&&(dt.a.multiplyScalar(-1),dt.b.multiplyScalar(-1),dt.c.multiplyScalar(-1)),Wr(dt.a,dt.b,dt.c,t,3,m,r,!0)):(wa.fromBufferAttribute(p,l),Ca.fromBufferAttribute(p,h),Ra.fromBufferAttribute(p,f),Wr(wa,Ca,Ra,t,y,m,r))}}function Fa(c,t,e,n,i,s,r,a=!1){Xr(c,n,i,s,r,a),Xr(a?e:t,n,i,s,r,a),Xr(a?t:e,n,i,s,r,a)}function Zr(c,t,e=!1){switch(c){case 0:if(t===we||t===ts&&!e)return Ae;break;case 1:if(e){if(t===Ee)return cn}else if(t===we||t===ji)return Ae;break;case 2:if(e){if(t===we||t===ji)return Ae}else if(t===Ee)return cn;break;case 4:if(t===Ee)return cn;if(t===we)return Ae;break;case 3:if(t===Ee||t===ts&&!e)return Ae;break;case 5:if(!e&&(t===we||t===ji))return Ae;break;case 6:if(!e&&(t===Ee||t===ts))return Ae;break;default:throw new Error(`Unrecognized CSG operation enum "${c}".`)}return ns}function Wr(c,t,e,n,i,s,r=!1,a=!1){let o=u=>{s.push(u.x),i>1&&s.push(u.y),i>2&&s.push(u.z),i>3&&s.push(u.w)};kr.set(0,0,0,0).addScaledVector(c,n.a.x).addScaledVector(t,n.a.y).addScaledVector(e,n.a.z),Ki.set(0,0,0,0).addScaledVector(c,n.b.x).addScaledVector(t,n.b.y).addScaledVector(e,n.b.z),Qi.set(0,0,0,0).addScaledVector(c,n.c.x).addScaledVector(t,n.c.y).addScaledVector(e,n.c.z),a&&(kr.normalize(),Ki.normalize(),Qi.normalize()),o(kr),r?(o(Qi),o(Ki)):(o(Ki),o(Qi))}function Xr(c,t,e,n,i,s=!1){for(let r in i){let a=t[r],o=i[r];if(!(r in t))throw new Error(`CSG Operations: Attribute ${r} no available on geometry.`);let u=a.itemSize;r==="position"?(Yt.fromBufferAttribute(a,c).applyMatrix4(e),o.push(Yt.x,Yt.y,Yt.z)):r==="normal"?(Yt.fromBufferAttribute(a,c).applyNormalMatrix(n),s&&Yt.multiplyScalar(-1),o.push(Yt.x,Yt.y,Yt.z)):(o.push(a.getX(c)),u>1&&o.push(a.getY(c)),u>2&&o.push(a.getZ(c)),u>3&&o.push(a.getW(c)))}}var $r=class{constructor(t){this.triangle=new X().copy(t),this.intersects={}}addTriangle(t,e){this.intersects[t]=new X().copy(e)}getIntersectArray(){let t=[],{intersects:e}=this;for(let n in e)t.push(e[n]);return t}},is=class{constructor(){this.data={}}addTriangleIntersection(t,e,n,i){let{data:s}=this;s[t]||(s[t]=new $r(e)),s[t].addTriangle(n,i)}getTrianglesAsArray(t=null){let{data:e}=this,n=[];if(t!==null)t in e&&n.push(e[t].triangle);else for(let i in e)n.push(e[i].triangle);return n}getTriangleIndices(){return Object.keys(this.data).map(t=>parseInt(t))}getIntersectionIndices(t){let{data:e}=this;return e[t]?Object.keys(e[t].intersects).map(n=>parseInt(n)):[]}getIntersectionsAsArray(t=null,e=null){let{data:n}=this,i=new Set,s=[],r=a=>{if(n[a])if(e!==null)n[a].intersects[e]&&s.push(n[a].intersects[e]);else{let o=n[a].intersects;for(let u in o)i.has(u)||(i.add(u),s.push(o[u]))}};if(t!==null)r(t);else for(let a in n)r(a);return s}reset(){this.data={}}},ss=class{constructor(){this.enabled=!1,this.triangleIntersectsA=new is,this.triangleIntersectsB=new is,this.intersectionEdges=[]}addIntersectingTriangles(t,e,n,i){let{triangleIntersectsA:s,triangleIntersectsB:r}=this;s.addTriangleIntersection(t,e,n,i),r.addTriangleIntersection(n,i,t,e)}addEdge(t){this.intersectionEdges.push(t.clone())}reset(){this.triangleIntersectsA.reset(),this.triangleIntersectsB.reset(),this.intersectionEdges=[]}init(){this.enabled&&(this.reset(),qr(this))}complete(){this.enabled&&qr(null)}};var he=new V,as=new U,Ce=new X,rs=new X,ue=new X,os=new X,Pt=[],Re=[];function kh(c){for(let t of c)return t}function za(c,t,e,n,i,s={}){let{useGroups:r=!0}=s,{aIntersections:a,bIntersections:o}=Ua(c,t),u=[],l=null,h;return h=r?0:-1,Ba(c,t,a,e,!1,n,i,h),Oa(c,t,a,e,!1,i,h),e.findIndex(d=>d!==6&&d!==5)!==-1&&(h=r?c.geometry.groups.length||1:-1,Ba(t,c,o,e,!0,n,i,h),Oa(t,c,o,e,!0,i,h)),Pt.length=0,Re.length=0,{groups:u,materials:l}}function Ba(c,t,e,n,i,s,r,a=0){let o=c.matrixWorld.determinant()<0;he.copy(t.matrixWorld).invert().multiply(c.matrixWorld),as.getNormalMatrix(c.matrixWorld).multiplyScalar(o?-1:1);let u=c.geometry.groupIndices,l=c.geometry.index,h=c.geometry.attributes.position,f=t.geometry.boundsTree,d=t.geometry.index,p=t.geometry.attributes.position,m=e.ids,y=e.intersectionSet;for(let g=0,_=m.length;g<_;g++){let v=m[g],x=a===-1?0:u[v]+a,M=3*v,A=l.getX(M+0),b=l.getX(M+1),T=l.getX(M+2);Ce.a.fromBufferAttribute(h,A).applyMatrix4(he),Ce.b.fromBufferAttribute(h,b).applyMatrix4(he),Ce.c.fromBufferAttribute(h,T).applyMatrix4(he),s.reset(),s.initialize(Ce);let C=y[v];for(let I=0,w=C.length;I<w;I++){let R=3*C[I],P=d.getX(R+0),D=d.getX(R+1),N=d.getX(R+2);rs.a.fromBufferAttribute(p,P),rs.b.fromBufferAttribute(p,D),rs.c.fromBufferAttribute(p,N),s.splitByTriangle(rs)}let E=s.triangles;for(let I=0,w=E.length;I<w;I++){let R=E[I],P=s.coplanarTriangleUsed?Da(R,f):Yr(R,f);Pt.length=0,Re.length=0;for(let D=0,N=n.length;D<N;D++){let ot=Zr(n[D],P,i);ot!==ns&&(Re.push(ot),Pt.push(r[D].getGroupAttrSet(x)))}if(Pt.length!==0){Ce.getBarycoord(R.a,os.a),Ce.getBarycoord(R.b,os.b),Ce.getBarycoord(R.c,os.c);for(let D=0,N=Pt.length;D<N;D++){let ot=Pt[D],Ut=Re[D]===cn;Na(v,os,c.geometry,c.matrixWorld,as,ot,o!==Ut)}}}}return m.length}function Oa(c,t,e,n,i,s,r=0){let a=c.matrixWorld.determinant()<0;he.copy(t.matrixWorld).invert().multiply(c.matrixWorld),as.getNormalMatrix(c.matrixWorld).multiplyScalar(a?-1:1);let o=t.geometry.boundsTree,u=c.geometry.groupIndices,l=c.geometry.index,h=c.geometry.attributes,f=h.position,d=[],p=c.geometry.halfEdges,m=new Set,y=an(c.geometry);for(let g=0,_=y;g<_;g++)g in e.intersectionSet||m.add(g);for(;m.size>0;){let g=kh(m);m.delete(g),d.push(g);let _=3*g,v=l.getX(_+0),x=l.getX(_+1),M=l.getX(_+2);ue.a.fromBufferAttribute(f,v).applyMatrix4(he),ue.b.fromBufferAttribute(f,x).applyMatrix4(he),ue.c.fromBufferAttribute(f,M).applyMatrix4(he);let A=Yr(ue,o);Re.length=0,Pt.length=0;for(let b=0,T=n.length;b<T;b++){let C=Zr(n[b],A,i);C!==ns&&(Re.push(C),Pt.push(s[b]))}for(;d.length>0;){let b=d.pop();for(let T=0;T<3;T++){let C=p.getSiblingTriangleIndex(b,T);C!==-1&&m.has(C)&&(d.push(C),m.delete(C))}if(Pt.length!==0){let T=3*b,C=l.getX(T+0),E=l.getX(T+1),I=l.getX(T+2),w=r===-1?0:u[b]+r;if(ue.a.fromBufferAttribute(f,C),ue.b.fromBufferAttribute(f,E),ue.c.fromBufferAttribute(f,I),!It(ue))for(let R=0,P=Pt.length;R<P;R++){let D=Re[R],N=Pt[R].getGroupAttrSet(w),ot=D===cn;Fa(C,E,I,h,c.matrixWorld,as,N,ot!==a)}}}}}function Hh(c){for(let t=0;t<c.length-1;t++){let e=c[t],n=c[t+1];if(e.materialIndex===n.materialIndex){let i=e.start,s=n.start+n.count;n.start=i,n.count=s-i,c.splice(t,1),t--}}}function Gh(c,t,e,n){e.clear();let i=c.attributes;for(let s=0,r=n.length;s<r;s++){let a=n[s],o=i[a];e.initializeArray(a,o.array.constructor,o.itemSize,o.normalized)}for(let s in e.attributes)n.includes(s)||e.delete(s);for(let s in t.attributes)n.includes(s)||(t.deleteAttribute(s),t.dispose())}function Wh(c,t,e){let n=!1,i=-1,s=c.attributes,r=t.groupAttributes[0];for(let o in r){let u=t.getTotalLength(o),l=t.getType(o),h=t.getItemSize(o),f=t.getNormalized(o),d=s[o];(!d||d.array.length<u)&&(d=new Q(new l(u),h,f),c.setAttribute(o,d),n=!0);let p=0;for(let m=0,y=Math.min(e.length,t.groupCount);m<y;m++){let g=e[m].index,{array:_,type:v,length:x}=t.groupAttributes[g][o],M=new v(_.buffer,0,x);d.array.set(M,p),p+=M.length}d.needsUpdate=!0,i=u/d.itemSize}if(c.index){let o=c.index.array;if(o.length<i)c.index=null,n=!0;else for(let u=0,l=o.length;u<l;u++)o[u]=u}let a=0;c.clearGroups();for(let o=0,u=Math.min(e.length,t.groupCount);o<u;o++){let{index:l,materialIndex:h}=e[o],f=t.getCount(l);f!==0&&(c.addGroup(a,f,h),a+=f)}c.setDrawRange(0,i),c.boundsTree=null,n&&c.dispose()}function Va(c,t){let e=t;return Array.isArray(t)||(e=[],c.forEach(n=>{e[n.materialIndex]=t})),e}var cs=class{constructor(){this.triangleSplitter=new $i,this.attributeData=[],this.attributes=["position","uv","normal"],this.useGroups=!0,this.consolidateGroups=!0,this.debug=new ss}getGroupRanges(t){return!this.useGroups||t.groups.length===0?[{start:0,count:1/0,materialIndex:0}]:t.groups.map(e=>({...e}))}evaluate(t,e,n,i=new Dt){let s=!0;if(Array.isArray(n)||(n=[n]),Array.isArray(i)||(i=[i],s=!1),i.length!==n.length)throw new Error("Evaluator: operations and target array passed as different sizes.");t.prepareGeometry(),e.prepareGeometry();let{triangleSplitter:r,attributeData:a,attributes:o,useGroups:u,consolidateGroups:l,debug:h}=this;for(;a.length<i.length;)a.push(new Ji);i.forEach((g,_)=>{Gh(t.geometry,g.geometry,a[_],o)}),h.init(),za(t,e,n,r,a,{useGroups:u}),h.complete();let f=this.getGroupRanges(t.geometry),d=Va(f,t.material),p=this.getGroupRanges(e.geometry),m=Va(p,e.material);p.forEach(g=>g.materialIndex+=d.length);let y=[...f,...p].map((g,_)=>({...g,index:_}));if(u){let g=[...d,...m];l&&(y=y.map(v=>{let x=g[v.materialIndex];return v.materialIndex=g.indexOf(x),v}).sort((v,x)=>v.materialIndex-x.materialIndex));let _=[];for(let v=0,x=g.length;v<x;v++){let M=!1;for(let A=0,b=y.length;A<b;A++){let T=y[A];T.materialIndex===v&&(M=!0,T.materialIndex=_.length)}M&&_.push(g[v])}i.forEach(v=>{v.material=_})}else y=[{start:0,count:1/0,index:0,materialIndex:0}],i.forEach(g=>{g.material=d[0]});return i.forEach((g,_)=>{let v=g.geometry;Wh(v,a[_],y),l&&Hh(v.groups)}),s?i:i[0]}evaluateHierarchy(t,e=new Dt){t.updateMatrixWorld(!0);let n=(s,r)=>{let a=s.children;for(let o=0,u=a.length;o<u;o++){let l=a[o];l.isOperationGroup?n(l,r):r(l)}},i=s=>{let r=s.children,a=!1;for(let u=0,l=r.length;u<l;u++){let h=r[u];a=i(h)||a}let o=s.isDirty();if(o&&s.markUpdated(),a&&!s.isOperationGroup){let u;return n(s,l=>{u?u=this.evaluate(u,l,l.operation):u=this.evaluate(s,l,l.operation)}),s._cachedGeometry=u.geometry,s._cachedMaterials=u.material,!0}else return a||o};return i(t),e.geometry=t._cachedGeometry,e.material=t._cachedMaterials,e}reset(){this.triangleSplitter.reset()}};var Ha=1e6,Ga=4e5,Jr=1e4;function Xh(c){if(!c||!(c.positions instanceof Float32Array)||!(c.normals instanceof Float32Array))throw new Error("Mesh position and normal buffers are required.");let{positions:t,normals:e,index:n}=c,i=t.length/3;if(!Number.isInteger(i)||i<3||i>Ha||e.length!==t.length)throw new Error("Mesh vertex count is invalid or exceeds the limit.");if(n!==null&&!(n instanceof Uint32Array))throw new Error("Mesh index must be Uint32Array or null.");let s=n?n.length:i;if(s<3||s%3||s/3>Ga)throw new Error("Mesh triangle count is invalid or exceeds the limit.");for(let r=0;r<t.length;r++)if(!Number.isFinite(t[r])||Math.abs(t[r])>Jr||!Number.isFinite(e[r]))throw new Error("Mesh contains invalid coordinates.");if(n){for(let r of n)if(r>=i)throw new Error("Mesh index is outside the vertex buffer.")}}function ka(c){let t=c.getAttribute("position"),e=c.getAttribute("normal"),n=c.index?.count??t.count,i=c.drawRange.start,s=Math.min(c.drawRange.count,n-i);if(i<0||i%3||s<0||s%3||s/3>Ga||s>Ha)throw new Error("Cut result exceeds the geometry limit.");let r=new Float32Array(s*3),a=new Float32Array(s*3);for(let o=0;o<s;o++){let u=c.index?c.index.getX(i+o):i+o;r[o*3]=t.getX(u),r[o*3+1]=t.getY(u),r[o*3+2]=t.getZ(u),a[o*3]=e.getX(u),a[o*3+1]=e.getY(u),a[o*3+2]=e.getZ(u)}if(!r.every(Number.isFinite)||!a.every(Number.isFinite))throw new Error("Cut generated invalid coordinates.");return{positions:r,normals:a,index:null}}function Wa(c,{center:t,radius:e}={}){let n=performance.now();Xh(c);let i=Array.isArray(t)?t:t&&[t.x,t.y,t.z];if(!i||i.length!==3||!i.every(u=>Number.isFinite(u)&&Math.abs(u)<=Jr)||!Number.isFinite(e)||e<=0||e>Jr)throw new Error("Cut center or radius is invalid.");let s=new ye;s.setAttribute("position",new Q(c.positions.slice(),3)),s.setAttribute("normal",new Q(c.normals.slice(),3)),c.index&&s.setIndex(new Q(c.index.slice(),1));let r=new Dt(s),a=new Dt(new vn(e,24,16));a.position.set(...i),r.updateMatrixWorld(!0),a.updateMatrixWorld(!0);let o=[new Dt,new Dt];try{let u=new cs;u.attributes=["position","normal"],u.useGroups=!1,u.evaluate(r,a,[1,3],o);let l=ka(o[0].geometry),h=ka(o[1].geometry);return{remaining:l,removed:h,removedTriangles:h.positions.length/9,durationMs:performance.now()-n}}finally{for(let u of[r,a,...o])u.disposeCacheData(),u.geometry.dispose(),u.material?.dispose?.()}}self.onmessage=({data:c})=>{let{id:t,epoch:e,geometry:n,center:i,radius:s}=c??{};try{let r=Wa(n,{center:i,radius:s}),a=[];for(let o of[r.remaining,r.removed])a.push(o.positions.buffer,o.normals.buffer),o.index&&a.push(o.index.buffer);self.postMessage({id:t,epoch:e,result:r},a)}catch{self.postMessage({id:t,epoch:e,error:"Hair cut failed. Try a smaller cut or reset the model."})}};})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2024 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
