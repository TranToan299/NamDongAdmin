import i18n from 'locales/i18n';
import * as Yup from 'yup';
import { PRODUCT_HAS_CHILDREN } from '../constants/app.constants';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})/;
const numberReg = /^[0-9]+$/;
const wordReg = /^([a-zA-ZÀ-ỹ]+\s)*[a-zA-ZÀ-ỹ]+$/;

const EmployeeActivityStatusSchema = Yup.object().shape({
  joiningDate: Yup.string().required(i18n.t<string>('validate.employee.joingDateRequired')),
  // .max(Yup.ref('leavingDate'), i18n.t<string>('validate.employee.joiningDateInvalid')),

  // .required(i18n.t<string>('validate.employee.leavingDateRequired')),
});
const EmployeeContactInfoSchema = Yup.object().shape({
  // emailContact: Yup.string()
  //   .required(i18n.t<string>('validate.employee.email'))
  //   .email(i18n.t<string>('validate.employee.invalidEmail')),
  // phoneContact: Yup.string()
  //   .required(i18n.t<string>('validate.employee.phone'))
  //   .min(10, i18n.t<string>('validate.employee.minPhone'))
  //   .max(11, i18n.t<string>('validate.employee.maxPhone')),
});
const EmployeeBankingInformationSchema = Yup.object().shape({
  accountHolder: Yup.string().required(i18n.t<string>('validate.employee.accountHolderName')),
  accountNumber: Yup.string()
    .required(i18n.t<string>('validate.employee.bankAccountNumber'))
    .matches(numberReg, i18n.t<string>('validate.employee.bankAccountNumberInvalid')),
  // bank_id: Yup.object().required(t('validate.employee.bankNameAbbreviation')),
  bank_id: Yup.mixed()
    .required(i18n.t<string>('validate.employee.bankNameAbbreviation'))
    .test('is-object-or-string', 'Invalid value', (value) => {
      return Yup.object().isValidSync(value) || Yup.string().isValidSync(value);
    }),
});

const EmployeeLaborContractSchema = Yup.object().shape({
  status: Yup.string().required(i18n.t<string>('validate.employee.statusActivityRequired')),
  // workingDate:Yup.string().required(i18n.t<string>('validate.employee.startDateRequired')),
});

const EmployeeInsuranceInfoSchema = Yup.object().shape({
  insuranceNumber: Yup.string()
    .required(i18n.t<string>('validate.employee.socialInsuranceNumber'))
    .matches(numberReg, i18n.t<string>('validate.employee.socialInsuranceNumberInvalid')),
  healthInsuranceCode: Yup.string()
    .required(i18n.t<string>('validate.employee.healthInsuranceCodeRequired'))
    .matches(numberReg, i18n.t<string>('validate.employee.healthInsuranceCodeInvalid')),
  status: Yup.string().required(i18n.t<string>('validate.employee.statusRequiredInsurance')),
  facility_id: Yup.string().required(i18n.t<string>('validate.employee.facilityNameRequired')),
});

const EmployeeInsuranceProgess = Yup.object().shape({
  fromDate: Yup.string().required(i18n.t<string>('validate.employee.startDateRequired')),
  toDate: Yup.string().required(i18n.t<string>('validate.employee.endDateRequired')),
  position: Yup.string().required(i18n.t<string>('validate.employee.positionRequired')),
  paymentRate: Yup.string().required(i18n.t<string>('validate.employee.paymentRateRequired')),
  ratio: Yup.string().required(i18n.t<string>('validate.employee.ratioRequired')),
  status: Yup.string().required(i18n.t<string>('validate.employee.statusRequired')),
  profileNumber: Yup.string().required(i18n.t<string>('validate.employee.profileNumberRequired')),
});

const EmployeeIncomeTaxInformationSchema = Yup.object().shape({
  taxCode: Yup.string()
    .required(i18n.t<string>('validate.employee.taxCode'))
    .matches(numberReg, i18n.t<string>('validate.employee.taxCodeInvalid')),
  typeOfTaxDocument: Yup.string().required(i18n.t<string>('validate.employee.typeOfDocumentTax')),
});

const EmployeeSignUpSchema = Yup.object().shape({
  fullName: Yup.string().required(i18n.t<string>('validate.employee.name')),
  email: Yup.string()
    .required(i18n.t<string>('validate.employee.email'))
    .email(i18n.t<string>('validate.employee.invalidEmail')),
  userName: Yup.string().required(i18n.t<string>('validate.employee.username')),
  password: Yup.string()
    .required(i18n.t<string>('validate.employee.password'))
    .matches(passwordReg, i18n.t<string>('validate.employee.passwordInvalid')),
  confirmPassword: Yup.string()
    .required(i18n.t<string>('validate.employee.verifyPassword'))
    .oneOf([Yup.ref('password')], i18n.t<string>('validate.employee.verifyPasswordInvalid')),
});

const ProjectFormInfoSchema = Yup.object().shape({
  projectId: Yup.string()
    .required(i18n.t<string>('validate.setting.projectIdRequired'))
    .matches(numberReg, i18n.t<string>('validate.setting.projectIdInvalid')),
  projectName: Yup.string().required(i18n.t<string>('validate.setting.projectNameRequired')),
});
const DepartmentFormInfoSchema = Yup.object().shape({
  departmentId: Yup.string()
    .required(i18n.t<string>('validate.setting.departmentIdRequired'))
    .matches(numberReg, i18n.t<string>('validate.setting.departmentIdInvalid')),
  departmentName: Yup.string().required(i18n.t<string>('validate.setting.departmentNameRequired')),
});

const DayoffFormInfoSchema = Yup.object().shape({
  dayoffId: Yup.string()
    .matches(numberReg, i18n.t<string>('validate.setting.dayoffIdInvalid'))
    .required(i18n.t<string>('validate.setting.dayoffIdRequired')),
  dayoffName: Yup.string().required(i18n.t<string>('validate.setting.dayoffNameRequired')),
});
const DocumentFormInfoSchema = Yup.object().shape({
  documentId: Yup.string().required(i18n.t<string>('validate.setting.documentIdRequired')),
  documentName: Yup.string()
    .required(i18n.t<string>('validate.setting.documentNameRequired'))
    .matches(numberReg, i18n.t<string>('validate.setting.documentIdInvalid')),
});

const PositionFormInfoSchema = Yup.object().shape({
  positionId: Yup.string()
    .required(i18n.t<string>('validate.setting.positionIdRequired'))
    .matches(numberReg, i18n.t<string>('validate.setting.positionIdInvalid')),
  positionName: Yup.string().required(i18n.t<string>('validate.setting.positionNameRequired')),
});
const DependentPersonFormSchema = Yup.object().shape({
  fullName: Yup.string().required(i18n.t<string>('validate.employee.nameRelationshipRequired')),
  identityCard: Yup.string()
    .required(i18n.t<string>('validate.employee.idCardRelationShipMemberRequired'))
    .matches(numberReg, i18n.t<string>('validate.employee.idCardRelationShipInvalid')),
  taxCode: Yup.string()
    .required(i18n.t<string>('validate.employee.taxCodeRelationshipRequired'))
    .matches(numberReg, i18n.t<string>('validate.employee.taxCodeRelationshipInvalid')),

  relationship: Yup.string().required(
    i18n.t<string>('validate.employee.relationshipWithEmployeeRequired')
  ),
  typeOfDocument: Yup.string().required(
    i18n.t<string>('validate.employee.documentRelationshipRequired')
  ),
  startDate: Yup.string().required(
    i18n.t<string>('validate.employee.startDateRelationshipRequired')
  ),
  // .max(
  //   Yup.ref('endDateRelationship'),
  //   i18n.t<string>('validate.employee.startDateRelationshipInvalid')
  // )
});

const DistrictFormSchema = Yup.object().shape({
  provinceId: Yup.string().required(i18n.t<string>('validate.setting.provinceIdRequired')),
  districtId: Yup.string().required(i18n.t<string>('validate.setting.districtIdRequired')),
  districtName: Yup.string().required(i18n.t<string>('validate.setting.districtNameRequired')),
});
const ProvinceFormSchema = Yup.object().shape({
  provinceId: Yup.string().required(i18n.t<string>('validate.setting.provinceIdRequired')),
  provinceName: Yup.string().required(i18n.t<string>('validate.setting.provinceNameRequired')),
});
const NationalityFormSchema = Yup.object().shape({
  nationalityId: Yup.string().required(i18n.t<string>('validate.setting.nationalityIdRequired')),
  nationalityName: Yup.string().required(
    i18n.t<string>('validate.setting.nationalityNameRequired')
  ),
});
const BankingFormSchema = Yup.object().shape({
  transferType: Yup.string().required(i18n.t<string>('validate.setting.transferTypeRequired')),
  bankingName: Yup.string().required(i18n.t<string>('validate.setting.bankingNameRequired')),
});

const WardFormSchema = Yup.object().shape({
  districtId: Yup.string().required(i18n.t<string>('validate.setting.districtIdRequired')),
  wardId: Yup.string().required(i18n.t<string>('validate.setting.wardIdRequired')),
  wardName: Yup.string().required(i18n.t<string>('validate.setting.wardNameRequired')),
});
const MedicalFacilityFormSchema = Yup.object().shape({
  provinceId: Yup.string().required(i18n.t<string>('validate.setting.provinceIdRequired')),
  medicalFacilityId: Yup.string().required(
    i18n.t<string>('validate.setting.medicalFacilityIdRequired')
  ),
  medicalFacilityName: Yup.string().required(
    i18n.t<string>('validate.setting.medicalFacilityNameRequired')
  ),
});
const OrderFormSchema = Yup.object().shape({
  fullName: Yup.string()
    .required(i18n.t<string>('validate.order.nameRequired'))
    .max(50, i18n.t<string>('validate.order.maxName')),
  email: Yup.string()
    .required(i18n.t<string>('validate.order.emailRequired'))
    .email(i18n.t<string>('validate.order.emailValid')),
  phoneNumber: Yup.string()
    .required(i18n.t<string>('validate.order.phoneRequired'))
    .min(10, i18n.t<string>('validate.order.minPhone'))
    .max(11, i18n.t<string>('validate.order.maxPhone'))
    .matches(numberReg, i18n.t<string>('validate.order.phoneValid')),
  address: Yup.string().required(i18n.t<string>('validate.order.addressRequired')),
  // product_id: Yup.string().required(i18n.t<string>('validate.order.productRequired')),
  // qty: Yup.number()
  //   .required(i18n.t<string>('validate.order.quantityRequired'))
  //   .positive(i18n.t<string>('validate.order.quantityPositive'))
  //   .integer(i18n.t<string>('validate.order.quantityInvalid'))
  //   .typeError(i18n.t<string>('validate.order.quantityNumber'))
  //   .max(100, i18n.t<string>('validate.order.quantityMax')),
  productList: Yup.array().of(
    Yup.object().shape({
      product_id: Yup.string().required(i18n.t<string>('validate.order.productRequired')),
      qty: Yup.number()
        .required(i18n.t<string>('validate.order.quantityRequired'))
        .positive(i18n.t<string>('validate.order.quantityPositive'))
        .integer(i18n.t<string>('validate.order.quantityInvalid'))
        .typeError(i18n.t<string>('validate.order.quantityNumber'))
        .max(100, i18n.t<string>('validate.order.quantityMax')),
    })
  ),
  note: Yup.string().required(i18n.t<string>('validate.order.noteRequired')),
});

const EventFormSchema = Yup.object().shape({
  name: Yup.string()
    .required(i18n.t<string>('validate.event.nameRequired'))
    .max(50, i18n.t<string>('validate.event.maxName')),
  description: Yup.string().required(i18n.t<string>('validate.event.descriptionRequired')),
  // content: Yup.string().required(i18n.t<string>('validate.event.contentRequired')),
  // thumbnail: Yup.string().required(i18n.t<string>('validate.event.thumbnailRequired')),
  type: Yup.string().required(i18n.t<string>('validate.event.eventTypeRequired')),
});

const ProductFormSchema = Yup.object().shape({
  productName: Yup.string()
    .required(i18n.t<string>('validate.product.productNameRequired'))
    .max(50, i18n.t<string>('validate.product.maxName')),
  productType: Yup.string().required(i18n.t<string>('validate.product.productTypeRequired')),
  description: Yup.string().required(i18n.t<string>('validate.product.productDescriptionRequired')),
  // thumbnail: Yup.mixed().required(i18n.t<string>('validate.product.thumbnailRequired')),
  thumbnail: Yup.mixed()
    .test('required', i18n.t<string>('validate.product.thumbnailRequired'), (file) => {
      if (file) return true;
      return false;
    })
    .nullable(i18n.t<string>('validate.product.thumbnailRequired')),
});

const ProductFormAllSchema = Yup.object().shape({
  productName: Yup.string()
    .required(i18n.t<string>('validate.product.productNameRequired'))
    .max(50, i18n.t<string>('validate.product.maxName')),
  productType: Yup.string().required(i18n.t<string>('validate.product.productTypeRequired')),
  description: Yup.string().required(i18n.t<string>('validate.product.productDescriptionRequired')),
  // thumbnail: Yup.mixed().required(i18n.t<string>('validate.product.thumbnailRequired')),
  thumbnail: Yup.mixed()
    .test('required', i18n.t<string>('validate.product.thumbnailRequired'), (file) => {
      if (file) return true;
      return false;
    })
    .nullable(i18n.t<string>('validate.product.thumbnailRequired')),
  price: Yup.number()
    .typeError(i18n.t<string>('validate.product.numberRequired'))
    .test({
      message: i18n.t<string>('validate.product.numberRequired'),
      test: (value, context) => {
        if (context) {
          const { productType } = context.parent;
          if (Number(productType) !== PRODUCT_HAS_CHILDREN) return true;
          if (!value) return false;
        }
        return true;
      },
    }),
  salePrice: Yup.string()
    .nullable()
    .typeError(i18n.t<string>('validate.product.numberRequired'))
    .matches(numberReg, i18n.t<string>('validate.product.numberRequired'))
    .test({
      message: i18n.t<string>('validate.product.lessPrice'),
      test: (value, context) => {
        if (!value) return true;
        if (context) {
          const { price, productType } = context.parent;
          if (Number(productType) !== PRODUCT_HAS_CHILDREN) return true;
          if (!price) return false;
          if (value && price) return value < price;
        }
        return false;
      },
    }),
  typeDetailId: Yup.string()
    // .required(i18n.t<string>('validate.product.typeDetailIdRequired'))
    .nullable(i18n.t<string>('validate.product.typeDetailIdRequired'))
    .test({
      message: i18n.t<string>('validate.product.typeDetailIdRequired'),
      test: (value, context) => {
        if (context) {
          const { productType } = context.parent;
          if (value) return true;
          if (productType) {
            return Number(productType) === PRODUCT_HAS_CHILDREN;
          }
        }
        return true;
      },
    }),
});

const ProjectImageFormSchema = Yup.object().shape({
  projectImage: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required(i18n.t<string>('validate.projectImage.nameRequired')),
      images: Yup.array()
        .required(i18n.t<string>('validate.projectImage.nameRequired'))
        .min(1, i18n.t<string>('validate.projectImage.minImage')),
    })
  ),
});

export {
  BankingFormSchema,
  EmployeeBankingInformationSchema,
  EmployeeInsuranceProgess,
  NationalityFormSchema,
  WardFormSchema,
  MedicalFacilityFormSchema,
  ProvinceFormSchema,
  DistrictFormSchema,
  EmployeeContactInfoSchema,
  EmployeeIncomeTaxInformationSchema,
  EmployeeInsuranceInfoSchema,
  EmployeeSignUpSchema,
  ProjectFormInfoSchema,
  DepartmentFormInfoSchema,
  EmployeeActivityStatusSchema,
  EmployeeLaborContractSchema,
  DayoffFormInfoSchema,
  DocumentFormInfoSchema,
  PositionFormInfoSchema,
  DependentPersonFormSchema,
  OrderFormSchema,
  EventFormSchema,
  ProductFormSchema,
  ProductFormAllSchema,
  ProjectImageFormSchema,
};
