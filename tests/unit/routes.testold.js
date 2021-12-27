// importing the JS router function and vms schema model
const router = require('../../routes/clusters');
// const Vms = require('../../models/vms');

// router.post = jest.fn();
// router.get = jest.fn();
// router.patch = jest.fn();
// router.delete = jest.fn();

// Vms.create = jest.fn();

//describe is a test suite!
describe('API routes have the required functions Get, Post, Update and Delete', () => {
    test('the get request route', () => {
        // assert
        expect(typeof router.get).toBe('function');
    });

    test('the post request route', () => {
        // assert
        expect(typeof router.post).toBe('function');
    });

    test('the patch request route', () => {
        // assert
        expect(typeof router.patch).toBe('function');
    });

    test('the delete request route', () => {
        // assert
        expect(typeof router.delete).toBe('function');
    });

});

/*
// Get function
describe('router.get', () => {
    it('should have a get function', () => {
        expect(typeof router.get).toBe('function');
    });
});

// Post function
describe('router.post', () => {
    it('should have a post function', () => {
        expect(typeof router.post).toBe('function');
    });
});

// Patch function
describe('router.patch', () => {
    it('should have a patch function', () => {
        expect(typeof router.patch).toBe('function');
    });
});

// Delete function
describe('router.delete', () => {
    it('should have a delete function', () => {
        expect(typeof router.delete).toBe('function');
    });
});


/*
describe("Vms model", () => {
    it("should call on vmsSchema", () => {
    const vms = new Vms();
       router.post();
        expect(Vms).toBeCalled();
    });
});
*/
/*
describe("Vms model", () => {
    it("should call on vmsSchema", () => {
    const vms = new Vms();
       router.post();
        expect(Vms.create).toBeCalled();
    });
});
*/

/*
    it('should have a post function', () => {
        expect(typeof router.post).toBe('function');
    });
    it('should have a patch function', () => {
        expect(typeof router.patch).toBe('function');
    });
    it('should have a delete function', () => {
        expect(typeof router.delete).toBe('function');
    });
    it('should call Vms', () => {
        router.post();
        expect(Vms).toBeCalled();
    });
});
*/