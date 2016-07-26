/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-06-13
 * @author Liang <liang@maichong.it>
 */

import _ from 'lodash';
import BALANCE from 'alaska-balance';
import USER from 'alaska-user';

export default class BalancePlugin {
  constructor(service) {
    this.service = service;
    service.payments['balance'] = this;
    service.addConfigDir(__dirname);
  }

  /**
   * 创建支付参数
   * @param {Payment} payment
   * @param {Object} [data]
   * @returns {string}
   */
  async createParams(payment, data) {
    let currency = payment.currency || BALANCE.defaultCurrency.value;
    let user;
    if (payment.populated('user')) {
      user = payment.user;
    } else {
      const User = USER.model('User');
      user = await User.findById(payment.user);
    }
    if (!user) {
      alaska.panic('Unknown user for payment');
    }
    let balance = user.get(currency);
    if (balance < payment.amount) {
      alaska.error('Insufficient balance');
    }

    await user._[currency].income(-payment.amount, payment.title, 'payment');

    payment.currency = currency;
    payment.state = 1;

    return 1;
  }
}
