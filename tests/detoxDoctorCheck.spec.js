import DetoxDoctorCheck from "../detoxDoctorCheck";

jest.mock("../detoxDoctorCheck");

describe("Detox Doctor Check", () => {
  beforeEach(() => {
    DetoxDoctorCheck.mockClear();
  });

  test("contains no options if none are passed in", () => {
    const detoxDoctorCheck = new DetoxDoctorCheck();

    expect(detoxDoctorCheck.options).toEqual(undefined);
  });

  test("contains correct options if some are passed in", () => {
    const options = {
      iosOnly: true,
      excludeOptional: true,
    };

    const detoxDoctorCheck = new DetoxDoctorCheck(options);

    expect(detoxDoctorCheck.options.iosOnly).toBe(true);
    expect(detoxDoctorCheck.options.excludeOptional).toBe(true);
  });

  test("start runs the correct os test", () => {
    const check = new DetoxDoctorCheck();
  });
});
