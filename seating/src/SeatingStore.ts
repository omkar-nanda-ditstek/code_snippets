import ISeating from '@demo/models/.dist/interfaces/ISeating';
// import * as pb from '@demo/models/.dist/demo-proto';
import Tracer  from '@demo/service/.dist/Tracer';
// import joiToErrors  from '@demo/service/.dist/joiToErrors';
// import Joi from '@hapi/joi';

const tracer = new Tracer('SeatingStore');

export default class SeatingStore {

  public static OPERATION_UNSUCCESSFUL = class extends Error {
    constructor() {
      super('An error occured while processing the request.');
    }
  };

  private Seating;

  constructor(Seating) {
    this.Seating = Seating;
  }
  public async createSeating(spanContext: string, seating: ISeating): Promise<ISeating> {
    const span = tracer.startSpan('createSeating', spanContext);
    const newSeating = new this.Seating(seating);

    let saveSeating: ISeating;
    try {
      saveSeating = await newSeating.save();
    } catch (e) {
      console.error(e);
      span.setTag('error', true);
      span.log({ errors: e.message  });
      span.finish();
      return Promise.reject(new SeatingStore.OPERATION_UNSUCCESSFUL());
    }
    span.finish();
    return saveSeating;
  }
  public async findOrganizationSeating(spanContext: string, orgId: string): Promise<ISeating> {
    const span = tracer.startSpan('findOrganizationSeating', spanContext);

    let seating: ISeating;
    try {
      seating = await this.Seating.findOne({ orgId })
    } catch (e) {
      console.error(e);
      span.setTag('error', true);
      span.log({ errors: e.message });
      span.finish();
      return Promise.reject(new SeatingStore.OPERATION_UNSUCCESSFUL());
    }
    span.finish();
    return seating;
  }

  public async healthCheck(): Promise<ISeating> {
    let seating: ISeating;
    try {
      seating = await this.Seating.findOne();
    } catch (e) {
      return Promise.reject(new SeatingStore.OPERATION_UNSUCCESSFUL());
    }
    return seating;
  }

}
