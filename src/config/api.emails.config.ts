import { Injectable } from '@nestjs/common';
import SibApiV3Sdk from 'sib-api-v3-sdk';

@Injectable()
export class EmailsConfigService {
  private defaultClient: SibApiV3Sdk.ApiClient;
  private transactionalEmails: SibApiV3Sdk.TransactionalEmailsApi;

  constructor() {
    this.defaultClient = SibApiV3Sdk.ApiClient.instance;
    const apiKey = this.defaultClient.authentications['api-key'];
    apiKey.apiKey = process.env.BREVO_API_KEY;

    this.transactionalEmails = new SibApiV3Sdk.TransactionalEmailsApi();
  }

  get client(): SibApiV3Sdk.TransactionalEmailsApi {
    return this.transactionalEmails;
  }
}