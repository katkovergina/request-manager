export type RequestType = 'equipment' | 'software';

export type EquipmentType = 'laptop' | 'monitor' | 'keyboard';

export type AccessDuration = '30' | '90' | '365';

interface BaseRequest {
  employeeName: string;
  email: string;
  comment: string;
}

export interface EquipmentRequest extends BaseRequest {
  type: 'equipment';
  equipment: EquipmentType;
  quantity: number;
}

export interface SoftwareRequest extends BaseRequest {
  type: 'software';
  service: string;
  accessDuration: AccessDuration;
}

export type RequestPayload = EquipmentRequest | SoftwareRequest;

export interface RequestResponse {
  id: string;
}
