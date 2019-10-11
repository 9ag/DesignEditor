import { OperationMode } from '../lib/enum';
import { IRootStore } from '../schemas/common';
import { IData, IRow, IColumn, IContent, IRowType, IContentType, IContentMeta } from '../schemas/transform';
import { IExtension } from 'src/containers/extension/Extension';
declare class DesignState {
    transparent: IRootStore;
    constructor(transparent: any);
    execCommand(method: any, ...rest: any[]): void;
    data: IData;
    selected: string;
    setSelected(guid: string): void;
    deleteSelected(): void;
    extensions: IExtension[];
    addExtension(extension: IExtension): void;
    getExtension(type: string): IExtension;
    getExtensions(): IExtension[];
    extensionGroups: Set<string>;
    addExtensionGroup(group: string): void;
    getExtensionGroups(): string[];
    attribute: Object;
    setAttribute(type: string, attribute: Object): void;
    getData(): IData;
    setData(json: IData): void;
    compatibleWithOldData(): void;
    addRow(row: IRowType): void;
    insertRow(row: IRowType, guid: string, position?: number): void;
    moveRow(row: IRowType, offsetGuid: string, position?: number): void;
    addContent(content: IContentType, meta: IContentMeta): void;
    insertContent(content: IContentType, offsetGuid: string, columnGuid: string, position?: number): void;
    moveContent(content: IContentType, offsetGuid: string, columnGuid: string, position?: number): void;
    getContent(guid: string, operation?: OperationMode): IContent;
    deleteContent(guid: string): void;
    deleteRow(guid: string): void;
    copyContent(guid: string): void;
    copyRow(guid: string): void;
    getRow(guid: string): IRow;
    getColumn(guid: string): IColumn;
    updateAttribute(guid: string, key: string, value: Object): void;
    updateBodyAttribute(key: string, value: Object): void;
    getDataByGuid(guid: string): IRow | IContent;
    guid(): string;
}
export default DesignState;
