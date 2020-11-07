import { Selection, window } from 'vscode';
import { defaultComponentName, defaultSkipImport } from './constants';

export async function showInputBox(): Promise<string> {
  const result = await window.showInputBox({
    value: '',
    placeHolder: 'Choose your component name ...',
  });
  return result || defaultComponentName;
}

export async function showInputBoxForSkipImport(): Promise<boolean> {
  type Choices = 'Yes' | 'No';
  const result = await window.showQuickPick(['No', 'Yes'], {
    placeHolder: 'Allows for skipping the module import.', canPickMany: false, ignoreFocusOut: true
  }) as Choices;
  const mapToBoolean = {
    'Yes': true,
    'No': false
  };
  return mapToBoolean[result] || defaultSkipImport;
}

export function createScript(
  newComponent: string,
  skipImport: boolean,
  activeFile: string,
  selection: Selection,
  debugMode: boolean
): string {
  const { start, end } = selection;
  const script = `ng g @componizer/schematics:ng-componize --name ${newComponent} --activeFile ${activeFile} --start ${start.line} --end ${end.line} --customSkipImport ${skipImport} --debugMode ${debugMode}`;
  window.showInformationMessage(script);
  return script;
}
