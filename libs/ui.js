/**
 * UI
 */

const WIN = require('ui/window');
const LANG = require('../language/');
const LANG_T = antSword["language"]['toastr'];
const clipboard = require('electron').clipboard;

class UI {
  constructor() {
    // 创建一个窗口
    let self = this;
    self.win = new WIN({
      title: `${LANG['title']}`,
      width: 660,
      height: 450,
    });
    self.config = {
      type: '',
      pwd: self._randomStr(8),
      highlight: '',
      pwdhint: ''
    }
    self.createMainLayout();
    // self.win.centerOnScreen();
    return {
      onGenerate: (func) => {
        self.bindToolbarClickHandler(func);
      },
      onAbout: () => {}
    }
  }

  /**
   * 创建界面
   */
  createMainLayout() {
    this.createToolbar();
    this.createEditor();
  }

  /**
   * 工具栏
   */
  createToolbar() {
    let self = this;
    let toolbar = self.win.win.attachToolbar();
    toolbar.loadStruct([{
        type: 'buttonSelect',
        text: LANG['toolbar']['new'],
        icon: 'plus-circle',
        id: 'new',
        openAll: true,
        options: [
          { id: 'asp', icon: 'file-code-o', type: 'button', text: "ASP" }, // 暂不支持  asp aspx
          { id: 'aspx', icon: 'file-code-o', type: 'button', text: "ASPX" },
          { id: 'aspxcsharp', icon: 'file-code-o', type: 'button', text: "ASPXCSHARP" },
          { id: 'php', icon: 'file-code-o', type: 'button', text: "PHP" },
          { id: 'jsp', icon: 'file-code-o', type: 'button', text: "JSP" },
          { id: 'jspx', icon: 'file-code-o', type: 'button', text: "JSPX" },
          { id: 'jspjs', icon: 'file-code-o', type: 'button', text: "JSPJS" },
          { id: 'jspxjs', icon: 'file-code-o', type: 'button', text: "JSPXJS" },
        ]
      },
      { id: 'copy', type: 'button', text: LANG['toolbar']['copy'], icon: 'copy' },
      { id: 'refresh', type: 'button', text: LANG['toolbar']['refresh'], icon: 'refresh', disabled: true },
      { id: 'clear', type: 'button', text: LANG['toolbar']['clear'], icon: 'remove' }
    ]);
    self.toolbar = toolbar;
  }

  createEditor() {
    let self = this;
    self.editor = null;
    // 初始化编辑器
    self.editor = ace.edit(self.win.win.cell.lastChild);
    self.editor.$blockScrolling = Infinity;
    self.editor.setTheme('ace/theme/tomorrow');
    self.editor.session.setMode(`ace/mode/php`);
    self.editor.session.setUseWrapMode(true);
    self.editor.session.setWrapLimitRange(null, null);

    self.editor.setOptions({
      fontSize: '14px',
      enableBasicAutocompletion: true,
      enableSnippets: true,
      enableLiveAutocompletion: true
    });
    // 编辑器快捷键
    self.editor.commands.addCommand({
      name: 'import',
      bindKey: {
        win: 'Ctrl-S',
        mac: 'Command-S'
      },
      exec: () => {
        self.toolbar.callEvent('onClick', ['import']);
      }
    });
    const inter = setInterval(self.editor.resize.bind(self.editor), 200);
    self.win.win.attachEvent('onClose', () => {
      clearInterval(inter);
      return true;
    });
  }

  /**
   * 监听按钮点击事件
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  bindToolbarClickHandler(callback) {
    let self = this;
    self.toolbar.attachEvent('onClick', (id) => {
      switch (id) {
        case "asp":
          layer.prompt({
            value: "antsword",
            title: `<i class="fa fa-file-code-o"></i> ${LANG["prompt"]["create_pwd"]}`
          }, (value, i, e) => {
            layer.close(i);
            if (value === "antsword") {
              value = self._randomStr(8);
            }
            callback({
              type: "asp",
              pwd: value,
            }).then((data) => {
              if (data) {
                self.toolbar.enableItem('refresh');
                self.config.pwd = value;
                self.config.type = "asp";
                self.config.highlight = "ace/mode/asp";
                self.config.pwdhint = `<!-- ${LANG['pwd_hint']}: ${value} -->`;
                self.editor.session.setMode(self.config.highlight);
                self.editor.session.setValue(`${self.config.pwdhint}\n${data}`);
                toastr.success(LANG["message"]["gen_success"], LANG_T['success']);
              }
            });
          });
          break
        case "aspx":
        case "aspxcsharp":
          layer.prompt({
            value: "antsword",
            title: `<i class="fa fa-file-code-o"></i> ${LANG["prompt"]["create_pwd"]}`
          }, (value, i, e) => {
            layer.close(i);
            if (value === "antsword") {
              value = self._randomStr(8);
            }
            callback({
              type: id,
              pwd: value,
            }).then((data) => {
              if (data) {
                self.toolbar.enableItem('refresh');
                self.config.pwd = value;
                self.config.type = id;
                self.config.highlight = "ace/mode/csharp";
                self.config.pwdhint = `<%-- // ${LANG['pwd_hint']}: ${value} --%>`;
                self.editor.session.setMode(self.config.highlight);
                self.editor.session.setValue(`${self.config.pwdhint}\n${data}`);
                toastr.success(LANG["message"]["gen_success"], LANG_T['success']);
              }
            });
          });
          break
        case "php":
          layer.prompt({
            value: "antsword",
            title: `<i class="fa fa-file-code-o"></i> ${LANG["prompt"]["create_pwd"]}`
          }, (value, i, e) => {
            layer.close(i);
            if (value === "antsword") {
              value = self._randomStr(8);
            }
            callback({
              type: "php",
              pwd: value,
            }).then((data) => {
              if (data) {
                self.toolbar.enableItem('refresh');
                self.config.pwd = value;
                self.config.type = "php";
                self.config.highlight = "ace/mode/php";
                self.config.pwdhint = `<?php // ${LANG['pwd_hint']}: ${value} ?>`;
                self.editor.session.setMode(self.config.highlight);
                self.editor.session.setValue(`${self.config.pwdhint}\n${data}`);
                toastr.success(LANG["message"]["gen_success"], LANG_T['success']);
              }
            });
          });
          break
        case "jsp":
        case "jspjs":
          layer.prompt({
            value: "antsword",
            title: `<i class="fa fa-file-code-o"></i> ${LANG["prompt"]["create_pwd"]}`
          }, (value, i, e) => {
            layer.close(i);
            if (value === "antsword") {
              value = self._randomStr(8);
            }
            callback({
              type: id,
              pwd: value,
            }).then((data) => {
              if (data) {
                self.toolbar.enableItem('refresh');
                self.config.pwd = value;
                self.config.type = id;
                self.config.highlight = "ace/mode/jsp";
                self.config.pwdhint = `<%-- ${LANG['pwd_hint']}: ${value} --%>`;
                self.editor.session.setMode(self.config.highlight);
                self.editor.session.setValue(`${self.config.pwdhint}\n${data}`);
                toastr.success(LANG["message"]["gen_success"], LANG_T['success']);
              }
            });
          });
          break
        case "jspx":
        case "jspxjs":
          layer.prompt({
            value: "antsword",
            title: `<i class="fa fa-file-code-o"></i> ${LANG["prompt"]["create_pwd"]}`
          }, (value, i, e) => {
            layer.close(i);
            if (value === "antsword") {
              value = self._randomStr(8);
            }
            callback({
              type: id,
              pwd: value,
            }).then((data) => {
              if (data) {
                self.toolbar.enableItem('refresh');
                self.config.pwd = value;
                self.config.type = id;
                self.config.highlight = "ace/mode/jsp";
                self.config.pwdhint = `<!-- ${LANG['pwd_hint']}: ${value} -->`;
                self.editor.session.setMode(self.config.highlight);
                self.editor.session.setValue(`${self.config.pwdhint}\n${data}`);
                toastr.success(LANG["message"]["gen_success"], LANG_T['success']);
              }
            });
          });
          break
        case "refresh":
          callback({
            type: self.config.type,
            pwd: self.config.pwd
          }).then((data) => {
            if (data) {
              self.editor.session.setMode(self.config.highlight);
              self.editor.session.setValue(`${self.config.pwdhint}\n${data}`);
              toastr.success(LANG["message"]["gen_success"], LANG_T['success']);
            }
          })
          break
        case "copy":
          let saveData = self.editor.session.getValue();
          if (!saveData) {
            toastr.warning(LANG["message"]["edit_null_value"], LANG_T["warning"]);
            return
          }
          clipboard.writeText(saveData);
          // 检测是否复制成功
          let txt = clipboard.readText();
          if (txt) {
            toastr.success(LANG["message"]["copy_success"], LANG_T['success']);
          } else {
            toastr.error(LANG["message"]["copy_fail"], LANG_T['error']);
          }
          break
        case "clear":
          self.editor.session.setValue("");
          break
      }
    });
  }
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
}

module.exports = UI;