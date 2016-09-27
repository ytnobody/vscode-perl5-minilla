'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    let minilTerminal:vscode.Terminal;

    function addCommand (id:string, func:any) {
        context.subscriptions.push(vscode.commands.registerCommand(id, func));    
    }

    function prompt (str:string) : Thenable<string> {
        return vscode.window.showInputBox({
            prompt: str,
            validateInput: str => {
                return str.length > 0 ? '' : str;
            }
        })
    }

    function doShell (cmd:string) {
        if (!minilTerminal) {
            minilTerminal = (<any>vscode.window).createTerminal(`Minilla Terminal`);
        }
        minilTerminal.sendText(cmd);
    }

    addCommand('minil.install', () => {
        doShell('cpanm -n Minilla');
    });

    addCommand('minil.new', () => {
        prompt('Module Name?').then((moduleName) => {
            doShell("minil new " + moduleName)
        })
    });

    addCommand('minil.build', () => {
        doShell('minil build')
    });

    addCommand('minil.test', () => {
        doShell('minil test')
    });
}

// this method is called when your extension is deactivated
export function deactivate() {
}