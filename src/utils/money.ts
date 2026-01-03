// src/utils/money.ts
export const formatCOP = (value: number | string) =>
  `$${Number(value || 0).toLocaleString('es-CO')}`;