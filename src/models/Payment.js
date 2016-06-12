/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-06-13
 * @author Liang <liang@maichong.it>
 */

import _ from 'lodash';
const BALANCE = alaska.service('alaska-balance');

export const fields = {
  currency: {
    label: 'Currency',
    type: 'select',
    options: BALANCE.currencies
  }
};

export default function (Payment) {
  if (_.find(Payment.fields.type.options, opt => opt.value === 'balance')) return;
  Payment.fields.type.options.push({ label: 'Balance', value: 'balance' });
}
