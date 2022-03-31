import { SessionStorageDataAccess } from './SessionStorageDataAccess';

const initialData = {
  name: 'Isha',
  organizationsWorkedIn: ['Opus', 'Amdocs', 'Credit Suisse'],
  address: {
    street: 'Imaginary Street',
    city: 'Pune',
  },
};

describe('Session Storage Data Access', () => {
  it('should initialize with given object and return it when it is not present', () => {
    const dataAccess = new SessionStorageDataAccess('author', initialData);
    const data = dataAccess.get();
    expect(data).toEqual(initialData);
  });

  it.todo(
    'should return persisted wordle status when it is already initialized',
  );

  it.todo('should update the state with partial data when provided so');

  it.todo('should update the state with whole data when provided so');

  it.todo(
    'should update the state with provided partial data and initialize rest of the data when when no base state is present',
  );
});
