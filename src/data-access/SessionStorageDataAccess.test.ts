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
  it('should initialize with initialData and return it when data is not available in sessionStorage', () => {
    const dataAccess = new SessionStorageDataAccess('author', initialData);
    const data = dataAccess.get();
    expect(data).toEqual(initialData);
  });

  it('should return persisted data when it is available in sessionStorage', () => {
    const dataAlreadyInSessionStorage = {
      name: 'Isha_Initial',
      organizationsWorkedIn: [
        'Opus_Initial',
        'Amdocs_Initial',
        'Credit Suisse_Initial',
      ],
      address: {
        street: 'Imaginary Street_Initial',
        city: 'Pune_Initial',
      },
    };

    sessionStorage.setItem(
      'author',
      JSON.stringify(dataAlreadyInSessionStorage),
    );

    const dataAccess = new SessionStorageDataAccess('author', initialData);
    const data = dataAccess.get();
    expect(data).toEqual(dataAlreadyInSessionStorage);
  });

  it.todo('should update the state with partial data when provided so');

  it.todo('should update the state with whole data when provided so');

  it.todo(
    'should update the state with provided partial data and initialize rest of the data when when no base state is present',
  );

  it.todo('should return modified data');
});
