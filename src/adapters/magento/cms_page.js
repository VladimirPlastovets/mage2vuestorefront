'use strict';

let AbstractMagentoAdapter = require('./abstract');

class CmspageAdapter extends AbstractMagentoAdapter {
  constructor(config) {
    super(config);
    this.use_paging = true;
  }

  getEntityType() {
    return 'cms_page';
  }

  getName() {
    return 'adapters/magento/CmspageAdapter';
  }

  getSourceData(context) {
    if (this.use_paging) {
      return this.api.cmsPages.list('&searchCriteria[currentPage]=' + this.page + '&searchCriteria[pageSize]=' + this.page_size).catch((err) => {
        throw new Error(err);
      });
    }

    return this.api.cmsPages.list().catch((err) => {
      throw new Error(err);
    });
  }

  /**
   * Regarding Magento2 api docs and reality
   * we do have an exception here that items aren't listed straight
   * in the response but under "items" key */
  prepareItems(items) {
    if (!items) {
      return items;
    }

    if (items.total_count) {
      this.total_count = items.total_count;
    }

    if (this.use_paging) {
      this.page_count = this.total_count / this.page_size;
    }

    if (items.items) {
      items = items.items; // this is an exceptional behavior for Magento2 api for lists
    }

    return items;
  }

  isFederated() {
    return false;
  }

  preProcessItem(item) {
    logger.debug(item);
    //
    return new Promise((done, reject) => {
      if (item) {
        item.product_id = item.entity_pk_value;

        delete item.entity_pk_value;
        delete item.ratings;

        logger.debug(`Cms page ${item.id}`);
      }

      return done(item);
    });
  }

  /**
   * We're transorming the data structure of item to be compliant with Smile.fr Elastic Search Suite
   * @param {object} item  document to be updated in elastic search
   */
  normalizeDocumentFormat(item) {
    return item;
  }
}

module.exports = CmspageAdapter;
