import * as yup from "yup";
const FILE_SIZE = 2 * 1024 * 1024; // 5 MB
const SUPPORTED_FORMATS = ["image/jpeg", "image/jpg", "image/png"];

export const loginValidation = yup.object().shape({
    email: yup
        .string()
        .email("Not a proper email")
        .required("Please enter an email"),
    password: yup.string().required("Please enter password."),
});
export const registerValidation = yup.object().shape({
    firstName: yup.string().max(40).required("Required"),
    lastName: yup.string().max(40).required("Required"),
    email: yup
        .string()
        .email("Not a proper email")
        .required("Please enter an email"),
    password: yup
        .string()
        .required("Password is required")
        .min(8, "Minumum 8 characters are required"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match").required("confirmPassword is also required"),
});
export const updatePasswordValidationSchema = yup.object().shape({
    oldPassword: yup
        .string()
        .required("Old Password is required"),
    newPassword: yup
        .string()
        .required("New Password is required"),
});
export const addDepositFormSchema = yup.object().shape({
    amount: yup.number()
        .required("Amount is required")
        .typeError("Amount must be a number")
        .min(2000, "Amount must be at least ₹2000"),

    screenShot: yup.mixed()
        .required("ScreenShot of Transaction is required.")
        .test(
            "fileSize",
            "ScreenShot of Transaction size should not exceed 5 MB.",
            (value) => value && value.size <= FILE_SIZE
        )
        .test(
            "fileFormat",
            "ScreenShot of Transaction must be in JPEG/JPG/PNG format.",
            (value) => value && SUPPORTED_FORMATS.includes(value.type)
        ),
});
export const withdrawFundFormSchema = yup.object().shape({
    amount: yup
        .string()
        .required("Amount is required"),
    panNumber: yup
        .string()
        .required("PAN Number is required"),
});
export const updateWalletSchema = yup.object().shape({
    amount: yup
        .string()
        .required("Amount is required"),

});
export const stockValidationSchema = yup.object().shape({
    name: yup
        .string()
        .required("Name is required"),
    quantity: yup
        .number()
        .required("Quantity is required"),
    startPrice: yup
        .number()
        .required("Start price is required"),
    // endPrice: yup
    //     .number()
    //     .required("End price is required"),
    actionType: yup
        .string().default('Buy')
        .required("Action Type is required"),
});
export const transactionEditValidationSchema = yup.object().shape({
    oldAmount: yup
        .number()
        .required("Old Amount is required"),
    newAmount: yup
        .number()
        .required("New Amount is required"),

});
export const holdingValidationSchema = yup.object().shape({
    name: yup
        .string()
        .required("Name is required"),
    quantity: yup
        .number()
        .required("Quantity is required"),
    startPrice: yup
        .number()
        .required("Start price is required"),
    // endPrice: yup
    //     .number()
    //     .required("End price is required"),
    actionType: yup
        .string().default('Buy')
        .required("Action Type is required"),
});
export const stockSellValidationSchema = (quantity) => yup.object().shape({
    name: yup
        .string()
        .required("Name is required"),
    quantity: yup
        .number()
        .max(quantity, `Max Value is${quantity}`)
        .required("Quantity is required"),
    endPrice: yup
        .number()
        .required("Start price is required"),
    // endPrice: yup
    //     .number()
    //     .required("End price is required"),
    actionType: yup
        .string().default('Sell')
        .required("Action Type is required"),
});
export const holdingSellValidationSchema = (quantity) => yup.object().shape({
    name: yup
        .string()
        .required("Name is required"),
    quantity: yup
        .number()
        .max(quantity, `Max Value is${quantity}`)
        .required("Quantity is required"),
    endPrice: yup
        .number()
        .required("Start price is required"),
    // endPrice: yup
    //     .number()
    //     .required("End price is required"),
    actionType: yup
        .string().default('Sell')
        .required("Action Type is required"),
});
export const contactValidationSchema = yup.object().shape({
    fullName: yup
        .string()
        .required("Name is required"),
    mobile: yup
        .string()
        .required("Mobile is required"),
    email: yup
        .string()
        .required("Email is required"),
    message: yup
        .string()
        .required("Message is required"),
});

export const createQuizValidationSchema = () => {
    return yup.object().shape({
        name: yup
            .string()
            .required("Field is required"),
        questionCount: yup
            .number()
            .required("Field is required"),
        rightMark: yup
            .number()
            .required("Field is required"),
        negativeMark: yup
            .number()
            .required("Field is required"),
        time: yup
            .number()
            .required("Field is required"),
        isPaid: yup
            .boolean()
        ,
        amount: yup
            .number()
            .when("isPaid", {
                is: true, // Conditional logic: applies when isPaid is true
                then: () => yup.number().min(10, 'Minimum amount is 10').required("Price field is required"), // Make amount required
                otherwise: () => yup.number().notRequired(), // Not required when isPaid is false
            }),
    });
};
export const createQuizQuestionSchema = () => {
    return yup.object().shape({
        question: yup.string()
            .required('Question is required'),
        option1: yup.string()
            .required('Option 1 is required'),
        option2: yup.string()
            .required('Option 2 is required'),
        option3: yup.string()
            .required('Option 3 is required'),
        option4: yup.string()
            .required('Option 4 is required'),
        writtenAnswer: yup.string()
            .required('Written answer is required'),
        answer: yup.string()
            .oneOf(['A', 'B', 'C', 'D'], 'Answer must be one of A, B, C, or D')
            .required('Answer is required'),
    });
}