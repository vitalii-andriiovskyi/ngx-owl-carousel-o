import { TemplateRef } from "@angular/core";

export class SliderModel {
  id: string;
  active: boolean;
  tplRef: TemplateRef<any>;
  dataMerge: number;
  width: number | string;
  marginL?: number | string;
  marginR?: number | string;
  center?: boolean;
  cloned: boolean;
}