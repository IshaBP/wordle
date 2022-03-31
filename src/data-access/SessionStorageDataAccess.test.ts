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
  beforeEach(() => sessionStorage.clear());

  it('should initialize with initialData and return it when data is not available in sessionStorage', () => {
    const dataAccess = new SessionStorageDataAccess('author', initialData);

    expect(dataAccess.get()).toEqual(initialData);
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

    expect(dataAccess.get()).toEqual(dataAlreadyInSessionStorage);
  });

  it('should update the state with provided partial data', () => {
    const newOrgs = ['Opus', 'Amdocs', 'Credit Suisse', 'Google'];
    const dataAccess = new SessionStorageDataAccess('author', initialData);
    dataAccess.set({
      organizationsWorkedIn: newOrgs,
    });

    expect(dataAccess.get()).toEqual({
      ...initialData,
      organizationsWorkedIn: newOrgs,
    });
  });

  it('should update the state with provided partial data and initialize rest of the data when when no base data is present', () => {
    const newOrgs = ['Opus', 'Amdocs', 'Credit Suisse', 'Google'];
    const dataAccess = new SessionStorageDataAccess('author', initialData);
    sessionStorage.clear(); // Forceful delete
    dataAccess.set({
      organizationsWorkedIn: newOrgs,
    });

    expect(dataAccess.get()).toEqual({
      ...initialData,
      organizationsWorkedIn: newOrgs,
    });
  });

  it('should return modified data from get after a series of set operations', () => {
    const modifiedData = {
      name: 'Isha_Modified',
      organizationsWorkedIn: ['Opus', 'Amdocs', 'Credit Suisse', 'Google'],
      address: {
        street: 'New Street',
        city: 'New City',
      },
    };
    const dataAccess = new SessionStorageDataAccess('author', initialData);
    dataAccess.set({
      organizationsWorkedIn: modifiedData.organizationsWorkedIn,
    });
    dataAccess.set({
      name: modifiedData.name,
    });
    dataAccess.set({
      address: modifiedData.address,
    });

    expect(dataAccess.get()).toEqual(modifiedData);
  });
});
