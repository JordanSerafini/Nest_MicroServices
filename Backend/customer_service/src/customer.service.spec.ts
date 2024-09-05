import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './app.service';
import { PoolModule } from 'pool.module';
import { Pool } from 'pg';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

describe('CustomerService', () => {
  let service: CustomerService;
  let pool: Pool;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PoolModule],
      providers: [CustomerService],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
    pool = module.get<Pool>('PG_CONNECTION');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a customer', async () => {
    const createCustomerDto: Partial<CreateCustomerDto> = {
      Name: 'John Doe',
      MainInvoicingContact_Email: 'john.doe@example.com',
      MainInvoicingAddress_Address1: '123 Main St',
    };

    const expectedResponse = { id: 1, ...createCustomerDto };

    jest
      .spyOn(pool, 'query')
      .mockResolvedValueOnce({ rows: [expectedResponse] });

    const result = await service.create(createCustomerDto as CreateCustomerDto);
    expect(result).toEqual(expectedResponse);
    expect(pool.query).toHaveBeenCalledWith(
      expect.stringContaining('INSERT INTO "Customer"'),
      ['John Doe', 'john.doe@example.com', '123 Main St'],
    );
  });

  it('should return an array when findAll is called', async () => {
    const expectedResponse = [{ id: 1, name: 'Customer1' }];

    jest.spyOn(pool, 'query').mockResolvedValueOnce({ rows: expectedResponse });

    const result = await service.findAll();
    expect(result).toEqual(expectedResponse);
    expect(pool.query).toHaveBeenCalledWith('SELECT * FROM "Customer"');
  });

  it('should return a single customer when findOne is called', async () => {
    const expectedResponse = { id: 1, name: 'Customer1' };

    jest
      .spyOn(pool, 'query')
      .mockResolvedValueOnce({ rows: [expectedResponse] });

    const result = await service.findOne(1);
    expect(result).toEqual(expectedResponse);
    expect(pool.query).toHaveBeenCalledWith(
      'SELECT * FROM "Customer" WHERE id = $1',
      [1],
    );
  });

  it('should update a customer', async () => {
    const updateCustomerDto: Partial<UpdateCustomerDto> = {
      Name: 'Jane Doe',
      MainInvoicingContact_Email: 'jane.doe@example.com',
      MainInvoicingAddress_Address1: '456 Main St',
    };
    const expectedResponse = { id: 1, ...updateCustomerDto };

    jest
      .spyOn(pool, 'query')
      .mockResolvedValueOnce({ rows: [expectedResponse] });

    const result = await service.update(
      1,
      updateCustomerDto as UpdateCustomerDto,
    );
    expect(result).toEqual(expectedResponse);
    expect(pool.query).toHaveBeenCalledWith(
      expect.stringContaining('UPDATE "Customer"'),
      ['Jane Doe', 'jane.doe@example.com', '456 Main St', 1],
    );
  });

  it('should remove a customer', async () => {
    const expectedResponse = { id: 1, Name: 'Customer1' };

    jest
      .spyOn(pool, 'query')
      .mockResolvedValueOnce({ rows: [expectedResponse] });

    const result = await service.remove(1);
    expect(result).toEqual(expectedResponse);
    expect(pool.query).toHaveBeenCalledWith(
      expect.stringContaining('DELETE FROM "Customer"'),
      [1],
    );
  });
});
