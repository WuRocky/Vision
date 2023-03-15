import React from "react";
import Register from "./Register";
import { render, fireEvent } from "@testing-library/react";

const renderWithMessage = (message, email, password) => {
    const setMessageMock = jest.fn();
    const { container, getByPlaceholderText } = render(
        <Register setMessage={setMessageMock} />
    );

    const emailInput = getByPlaceholderText("Email");
    const passwordInput = getByPlaceholderText("Password");

    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(passwordInput, { target: { value: password } });

    setMessageMock(message);
    return container;
};

// Update the tests as needed with the email and password parameters
it("Render Register with '請輸入姓名、信箱和密碼' message correctly", () => {
    const tree = renderWithMessage("請輸入姓名、信箱和密碼", "", "");
    expect(tree).toMatchSnapshot();
});

it("Render Register with '請輸入姓名、信箱和密碼' message correctly", () => {
    const tree = renderWithMessage("請輸入姓名、信箱和密碼", "", "asdasasdasd");
    expect(tree).toMatchSnapshot();
});

it("Render Register with '請輸入姓名、信箱和密碼' message correctly", () => {
    const tree = renderWithMessage("請輸入姓名、信箱和密碼", "asdasdasd", "");
    expect(tree).toMatchSnapshot();
});

it("Render Register with '電子信箱格式不正確' message correctly", () => {
    const tree = renderWithMessage("電子信箱格式不正確", "asdasdasd", "123456");
    expect(tree).toMatchSnapshot();
});

it("Render Register with '密碼應至少為 6 個字符' message correctly", () => {
    const tree = renderWithMessage("密碼應至少為 6 個字符", "test@test", "123");
    expect(tree).toMatchSnapshot();
});

it("Render Register with '電子信箱已有存在' message correctly", () => {
    const tree = renderWithMessage("電子信箱已有存在", "test@test", "123456");
    expect(tree).toMatchSnapshot();
});

it("Render Register with '註冊成功' message correctly", () => {
    const tree = renderWithMessage(
        "電子信箱已有存在",
        "test100@test",
        "123456"
    );
    expect(tree).toMatchSnapshot();
});

// import React from "react";
// import Register from "./Register";
// import { render } from "@testing-library/react";

// const renderWithMessage = (message) => {
//     const setMessageMock = jest.fn();
//     const { container } = render(<Register setMessage={setMessageMock} />);
//     setMessageMock(message);
//     return container;
// };

// it("Render Register with '請輸入姓名、信箱和密碼' message correctly", () => {
//     const tree = renderWithMessage("請輸入姓名、信箱和密碼");
//     expect(tree).toMatchSnapshot();
// });

// it("Render Register with '電子信箱格式不正確' message correctly", () => {
//     const tree = renderWithMessage("電子信箱格式不正確");
//     expect(tree).toMatchSnapshot();
// });

// it("Render Register with '密碼應至少為 6 個字符' message correctly", () => {
//     const tree = renderWithMessage("密碼應至少為 6 個字符");
//     expect(tree).toMatchSnapshot();
// });

// it("Render Register with '電子信箱已有存在' message correctly", () => {
//     const tree = renderWithMessage("電子信箱已有存在");
//     expect(tree).toMatchSnapshot();
// });

////////////////////////////////
// import React from "react";
// import { render, screen, fireEvent } from "@testing-library/react";
// import Register from "./Register";
// import "@testing-library/jest-dom/extend-expect";

// import * as useFireAuthentication from "../../hooks/useFireAuthentication";

// jest.mock("../../hooks/useFireAuthentication", () => ({
//     createUser: jest.fn(),
// }));

// describe("Register Component", () => {
//     const testCases = [
//         {
//             emailValue: "",
//             passwordValue: "",
//             expectedMessage: "請輸入姓名、信箱和密碼",
//         },
//         {
//             emailValue: "wrong-email",
//             passwordValue: "password123",
//             expectedMessage: "請輸入姓名、信箱和密碼",
//         },
//         {
//             emailValue: "aaa@example.com",
//             passwordValue: "password123",
//             expectedMessage: "",
//         },
//     ];

//     testCases.forEach(({ emailValue, passwordValue, expectedMessage }) => {
//         test(`setMessage is called with correct message when email is "${emailValue}" and password is "${passwordValue}"`, () => {
//             const setMessageMock = jest.fn();

//             const { container } = render(
//                 <Register setMessage={setMessageMock} />
//             );

//             const emailInput = screen.getByPlaceholderText("Email");
//             fireEvent.change(emailInput, { target: { value: emailValue } });

//             const passwordInput = screen.getByPlaceholderText("Password");
//             fireEvent.change(passwordInput, {
//                 target: { value: passwordValue },
//             });

//             const submitButton = screen.getByRole("button", {
//                 name: /sign up/i,
//             });
//             fireEvent.click(submitButton);

//             expect(setMessageMock).toHaveBeenCalledWith(expectedMessage);

//             expect(container.firstChild).toMatchSnapshot();
//         });
//     });
// });
