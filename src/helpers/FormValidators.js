const validation = {
  requiredField: "Este campo es requerido",
  maxLength: "El número máximo de caracteres debe ser {{max}}",
  minLength: "El valor debe ser mayor o igual a {{min}} caracteres",
  invalidNumber: "Número inválido",
  onlyNumbers: "Carácter no válido, use solo números.",
  maxRange: "El número debe ser menor a {{max}}",
  minRange: "El número debe ser mayor a {{min}}",
  pattern: "La información ingresada es incorrecta",
  currentDate: "La fecha de inicio debe ser mayor que la fecha actual.",
  dateRange: "La fecha de finalización debe ser mayor que la fecha de inicio en {{data}} minutos.",
  maxRangePerDay: "Máximo número de periodos por día cumplido.",
  notUniqueIdentifier: "El identificador ya existe, asignado a {{owner}}",
  patternAlphanumeric: "Debes ingresar letras y/o números solamente",
  patternAlphanumericName: "El nombre solo puede contener letras y números.",
  patternWithoutSpaces: "No puede contener espacios al inicio o final del texto.",
  patternDeviceId: "ID de dispositivo no válido",
  patternDeviceIp: "Dirección IP no válida",
  patternNumeric: "Debes ingresar números solamente",
  patternUrl: "La URL no es válida",
};

export const NO_SPECIAL_CHARS = '^[ÑA-Zña-z0-9\\s]+$';

export const WITH_SPECIAL_CHARS = '^[ÑA-Zña-z0-9\\-.()/\\s]+$';

export const FORMAT_URL = /^(?:http(s)?:\/\/)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/;

export const IP_V4_PATTERN = '^((\\d{1,2}|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(\\d{1,2}|1\\d\\d|2[0-4]\\d|25[0-5])$';

export const NO_SPACES_CHARS = '^[^-\\s][ÑA-Zña-z0-9\\s]+$';

export const regexWithFormatIPV4 = new RegExp(IP_V4_PATTERN);

export const isValidIP = ip => regexWithFormatIPV4.test(ip);

export const required = () => validation.requiredField;

export const invalidNumber = () => validation.invalidNumber;

export const onlyNumbers = () => validation.onlyNumbers;

export const minLength = min => validation.minLength + " " + min;

export const maxLength = max => validation.maxLength + " " + max;

export const maxRange = max => validation.maxRange + " " + max;

export const minRange = min => validation.minRange + " " + min;

export const pattern = () => validation.pattern;

export const notUnique = owner => validation.notUniqueIdentifier + " " + owner;

export const alphanumeric = () => validation.patternAlphanumeric;

export const nameAlphanumeric = () => validation.patternAlphanumericName;

export const nameWithoutSpaces = () => validation.patternWithoutSpaces;

export const validIP = () => validation.patternDeviceIp;

export const validUrl = () => validation.patternUrl;
