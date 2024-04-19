import { ksuidSync } from "../../../../utils/identifier";
import { CoreUserDTO, populateCoreUserDTO } from "../core_user_dto";
import { User } from "../user";

describe("Core User Spec", () => {
  test("User can be initiated correctly", async () => {
    const userDTO: CoreUserDTO = {
        id: ksuidSync(),
        userName: 'Redi',
        accountNumber: '09340234',
        emailAddress: 'rediramdan02@gmail.com',
        identityNumber: '11102022',
        createdAt: new Date(),
    }

    const user = new User(userDTO);

    expect(user?.id).toEqual(userDTO.id);
    expect(user?.userName).toEqual(userDTO.userName);
    expect(user?.accountNumber).toEqual(userDTO.accountNumber);
    expect(user?.emailAddress).toEqual(userDTO.emailAddress);
    expect(user?.identityNumber).toEqual(userDTO.identityNumber);
    expect(user?.createdAt).toEqual(userDTO.createdAt);
  });

  test("User can be populate correctly", async () => {
    const user = new User({
        id: ksuidSync(),
        userName: 'Redi',
        accountNumber: '09340234',
        emailAddress: 'rediramdan02@gmail.com',
        identityNumber: '11102022',
        createdAt: new Date(),
    });

    const userDTO = populateCoreUserDTO(user);

    expect(user?.id).toEqual(userDTO.id);
    expect(user?.userName).toEqual(userDTO.userName);
    expect(user?.accountNumber).toEqual(userDTO.accountNumber);
    expect(user?.emailAddress).toEqual(userDTO.emailAddress);
    expect(user?.identityNumber).toEqual(userDTO.identityNumber);
    expect(user?.createdAt).toEqual(userDTO.createdAt);
  });

  test("User attribute can be set correctly", async () => {
    const userDTO: CoreUserDTO = {
        id: ksuidSync(),
        userName: 'Redi',
        accountNumber: '09340234',
        emailAddress: 'rediramdan02@gmail.com',
        identityNumber: '11102022',
        createdAt: new Date(),
    };

    const user = new User(userDTO);

    user.userName = 'Redi edit'
    user.accountNumber = '08348234'
    user.emailAddress = 'rediramdan02+edit@gmail.com'
    user.identityNumber = '2349829348'
    user.updatedAt = new Date();

    expect(user?.userName).toEqual('Redi edit');
    expect(user?.accountNumber).toEqual('08348234');
    expect(user?.emailAddress).toEqual('rediramdan02+edit@gmail.com');
    expect(user?.identityNumber).toEqual('2349829348');
    expect(user?.updatedAt).toBeDefined();
  });
});
