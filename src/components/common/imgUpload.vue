<style rel="stylesheet/less" lang="less" scoped>

</style>

<template>
  <div>
    <input type="file" accept="image/jpg,image/jpeg,image/png" id="fileImage" name="img" v-on:change="fileOnChange">
  </div>
</template>

<script>
  import * as ex from '../../libs/EXIF-Reader.js';



  export default {
    name: 'imageUpload',
    props: {
      'maxSize':{
        type: [String, Number],
        default: 3*1024*1024
      },
      'api':{
        type: String,
        required: true
      }
    },
    data() {
      return {}
    },
    computed: {
    },
    methods: {
      fileOnChange(event){
					if(event.target.files[0].size>=this.maxSize){
            this.$emit('upload-callback',1,"图片太大了")
					}else{
						// 压缩图片
            var imgFiles = event.target.files ? event.target.files : null;
						var imgFileName=imgFiles[0].name;
						var _tar=imgFiles;
						this.zipImg({
							files: _tar,
							scale: 0.8,
							callback: (tar)=>{
                  if(tar.constructor != Array){
                    tar = [tar];
                  }
                  //触发上传函数
                  this.submit(tar,imgFileName);
							}
						});
					}
      },
      zipImg(cfg){
			 var _this = this;
			 var options = cfg;
        [].forEach.call(options.files, function(v, k){
          var fr = new FileReader();
          fr.onload= function(e) {
            var oExif = ex.EXIF.readFromBinaryFile(new ex.BinaryFile(e.target.result)) || {};
            var $img = document.createElement('img');
            $img.onload = function(){
              _this.fixDirect().fix($img, oExif, options.callback,options.scale);
            };
            if(typeof(window.URL) != 'undefined'){
              $img.src = window.URL.createObjectURL(v);
            }else{
              $img.src = window.webkitURL.createObjectURL(v);
            }

          };
          //fr.readAsDataURL(v);
          fr.readAsBinaryString(v);
        });
      },
      fixDirect(){
        			var r = {};
        r.fix = function(img, a, callback,scale) {
          var n = img.naturalHeight,
            i = img.naturalWidth,
            c = 1024,
            o = document.createElement("canvas"),
            s = o.getContext("2d");
          a = a || {};
          //o.width = o.height = c;
          //debugger;
          if(n > c || i > c){
            o.width = o.height = c;
          }else{
            o.width = i;
            o.height = n;
          }
          a.Orientation = a.Orientation || 1;
          r.detectSubSampling(img) && (i /= 2, n /= 2);
          var d, h;
          i > n ? (d = c, h = Math.ceil(n / i * c)) : (h = c, d = Math.ceil(i / n * c));
          // var g = c / 2,
          var g = Math.max(o.width,o.height)/2,
            l = document.createElement("canvas");
          if(n > c || i > c){
            l.width = g, l.height = g;
          }else{
            l.width = i;
            l.height = n;
            d = i;
            h =n;
          }
          //l.width = g, l.height = g;
          var m = l.getContext("2d"), u = r.detect(img, n) || 1;
          s.save();
          r.transformCoordinate(o, d, h, a.Orientation);
          var isUC = navigator.userAgent.match(/UCBrowser[\/]?([\d.]+)/i);
          if (isUC && $.os.android){
            s.drawImage(img, 0, 0, d, h);
          }else{
            for (var f = g * d / i, w = g * h / n / u, I = 0, b = 0; n > I; ) {
              for (var x = 0, C = 0; i > x; )
                m.clearRect(0, 0, g, g), m.drawImage(img, -x, -I), s.drawImage(l, 0, 0, g, g, C, b, f, w), x += g, C += f;
              I += g, b += w
            }
          }
          s.restore();
          a.Orientation = 1;
          img = document.createElement("img");
          img.onload = function(){
            a.PixelXDimension = img.width;
            a.PixelYDimension = img.height;
            //e(img, a);
          };

          callback && callback(o.toDataURL("image/jpeg", scale).substring(22));//压缩图片
        };
        r.detect = function(img, a) {
          var e = document.createElement("canvas");
          e.width = 1;
          e.height = a;
          var r = e.getContext("2d");
          r.drawImage(img, 0, 0);
          for(var n = r.getImageData(0, 0, 1, a).data, i = 0, c = a, o = a; o > i; ) {
            var s = n[4 * (o - 1) + 3];
            0 === s ? c = o : i = o, o = c + i >> 1
          }
          var d = o / a;
          return 0 === d ? 1 : d
        };
        r.detectSubSampling = function(img) {
          var a = img.naturalWidth, e = img.naturalHeight;
          if (a * e > 1048576) {
            var r = document.createElement("canvas");
            r.width = r.height = 1;
            var n = r.getContext("2d");
            return n.drawImage(img, -a + 1, 0), 0 === n.getImageData(0, 0, 1, 1).data[3]
          }
          return !1;
        };
        r.transformCoordinate = function(img, a, e, r) {
          switch (r) {
            case 5:
            case 6:
            case 7:
            case 8:
              img.width = e, img.height = a;
              break;
            default:
              img.width = a, img.height = e
          }
          var n = img.getContext("2d");
          switch (r) {
            case 2:
              n.translate(a, 0), n.scale(-1, 1);
              break;
            case 3:
              n.translate(a, e), n.rotate(Math.PI);
              break;
            case 4:
              n.translate(0, e), n.scale(1, -1);
              break;
            case 5:
              n.rotate(.5 * Math.PI), n.scale(1, -1);
              break;
            case 6:
              n.rotate(.5 * Math.PI), n.translate(0, -e);
              break;
            case 7:
              n.rotate(.5 * Math.PI), n.translate(a, -e), n.scale(-1, 1);
              break;
            case 8:
              n.rotate(-.5 * Math.PI), n.translate(-a, 0)
          }
        };
        return r;
      },
      submit(files,imgFileName){
        var _this=this;
          var file = files[0];
          var param = encodeURIComponent('fileName')+'='+encodeURIComponent(imgFileName)+'&'+encodeURIComponent('fileTempName')+'='+encodeURIComponent(file);
          param.replace(/%20/g, "+")
          if(file == ''){
            var msg="该浏览器不支持,请换浏览器";
            this.showMsg(msg);
          }else{
          var xmlhttp;

          if (window.XMLHttpRequest) {
          // code for modern browsers
          xmlhttp = new XMLHttpRequest();
      } else {
          // code for old IE browsers
          xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      }

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
           if (xmlhttp.status == 200) {
                _this.$emit('upload-callback',0,xmlhttp.responseText);
           }
           else {
               _this.$emit('upload-callback',2,"请求失败")
           }
        }
    };

    xmlhttp.open("POST", this.api, true);
    
    xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xmlhttp.send(param);


			}
		}
    }
  }
</script>