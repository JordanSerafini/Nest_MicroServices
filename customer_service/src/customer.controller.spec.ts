import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from './app.controller';
import { CustomerService } from './app.service';
import { PoolModule } from 'pool.module';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

describe('CustomerController', () => {
  let controller: CustomerController;
  let service: CustomerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PoolModule],
      controllers: [CustomerController],
      providers: [CustomerService],
    }).compile();

    controller = module.get<CustomerController>(CustomerController);
    service = module.get<CustomerService>(CustomerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a customer', async () => {
    const createCustomerDto: Partial<CreateCustomerDto> = {
      Name: 'John Doe',
      MainInvoicingContact_Email: 'john.doe@example.com',
      MainInvoicingAddress_Address1: '123 Main St',
    };

    const expectedResponse = { id: 1, ...createCustomerDto };

    jest.spyOn(service, 'create').mockResolvedValue(expectedResponse);

    const result = await controller.create(
      createCustomerDto as CreateCustomerDto,
    );
    expect(result).toEqual(expectedResponse);
    expect(service.create).toHaveBeenCalledWith(
      createCustomerDto as CreateCustomerDto,
    );
  });

  it('should return an array of customers', async () => {
    const expectedResponse = [{ id: 1, Name: 'Customer1' }];

    jest.spyOn(service, 'findAll').mockResolvedValue(expectedResponse);

    const result = await controller.findAll();
    expect(result).toEqual(expectedResponse);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return a single customer by id', async () => {
    const expectedResponse = { id: 1, Name: 'Customer1' };

    jest.spyOn(service, 'findOne').mockResolvedValue(expectedResponse);

    const result = await controller.findOne('1');
    expect(result).toEqual(expectedResponse);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('should update a customer', async () => {
    const updateCustomerDto: Partial<UpdateCustomerDto> = {
      Name: 'Jane Doe',
      MainInvoicingContact_Email: 'jane.doe@example.com',
      MainInvoicingAddress_Address1: '456 Main St',
    };
    const expectedResponse = { id: 1, ...updateCustomerDto };

    jest.spyOn(service, 'update').mockResolvedValue(expectedResponse);

    const result = await controller.update(
      '1',
      updateCustomerDto as UpdateCustomerDto,
      { id: '1', updateCustomerDto: updateCustomerDto as UpdateCustomerDto },
    );
    expect(result).toEqual(expectedResponse);
    expect(service.update).toHaveBeenCalledWith(
      1,
      updateCustomerDto as UpdateCustomerDto,
    );
  });

  it('should remove a customer', async () => {
    const expectedResponse = { id: 1, Name: 'Customer1' };

    jest.spyOn(service, 'remove').mockResolvedValue(expectedResponse);

    const result = await controller.remove('1');
    expect(result).toEqual(expectedResponse);
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
