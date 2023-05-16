import Carousel from "./Carousel";
import { Box, Button, Flex, Text, Image } from "@chakra-ui/react"
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useAuth0 } from '@auth0/auth0-react';
import '../Styles/Form.css'



function SignupPage() {

    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    };
    
    const validate = (values) => {
        const errors = {};
        if (!values.firstName) {
            errors.firstName = "Required*";
        }
        if (!values.lastName) {
            errors.lastName = "Required*";
        }
        if (!values.email) {
            errors.email = "Required*";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = "Invalid email address";
        }
        if (!values.password) {
            errors.password = "Required*";
        } else if (values.password.length < 8) {
            errors.password = "Password must be at least 8 characters long";
        }
        if (!values.confirmPassword) {
            errors.confirmPassword = "Confirm your password";
        }else if (values.password !== values.confirmPassword) {
            errors.confirmPassword = "Passwords do not match";
        }
        return errors;
    };
    
    const onSubmit = (values, { setSubmitting }) => {
        setTimeout(() => {
            console.log(values);
            setSubmitting(false);
        }, 400);
    }; 

    const { loginWithRedirect } = useAuth0();

    function handleLogin() {
        loginWithRedirect()
    }

    const LoginButton = () => {
        return (
            <Flex
                onClick={()=>{handleLogin()}}
                alignItems="center"
                justifyContent="space-between"
                backgroundColor="white"
                height="44px"
                width="260px"
                borderRadius="4px"
                border="1px solid #cfcfcf"
                boxShadow="-2px 4px 6px rgba(0, 0, 0, 0.5)"
                _hover={{
                    cursor: "pointer",
                }}
                _active={{
                    boxShadow: "-0px 2px 6px rgba(0, 0, 0, 0.5)",
                    transform: "translateY(1px) translateX(-1px)",
                }}
            >
                <Image
                    marginLeft="20px"
                    src="./assets/GoogleLogo.png"
                    height="32px"
                    width="32px"
                />
                <Text
                    marginRight="22px"
                    color="#4A4A4A"
                    className="small"
                    fontWeight="bold"
                >
                    Continue with Google
                </Text>
            </Flex>
        );
    }

    return (
        <>
            <Box
                bgImg="url('./assets/BG.jpg')"
                bgSize="cover"
                h="100vh"
                w="100vw"
                position="fixed"
                zIndex="-999"
            />
            <Box
                bgColor="black"
                h="100vh"
                w="100vw"
                opacity="40%"
                position="fixed"
                zIndex="-998"
            />
            <Flex
                h="100vh"
                w="100vw"
                alignItems="center"
                justifyContent="center"
            >
                <Flex h="560px" w="1080px">
                    <Box h="100%" w="48%" borderRadius="28px 0px 0px 28px">
                        <Carousel />
                    </Box>
                    <Box
                        h="100%"
                        w="52%"
                        borderRadius="0px 28px 28px 0px"
                        backgroundColor="#E8F4F9"
                        position="relative"
                    >
                        <Box>
                            <Text
                                className="heading"
                                fontWeight="semibold"
                                textAlign="center"
                                marginTop="60px"
                            >
                                Create a new account
                            </Text>
                            <Formik
                                initialValues={initialValues}
                                onSubmit={onSubmit}
                                validate={validate}
                            >
                                {({
                                    values,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                    isSubmitting,
                                }) => (
                                    <Form onSubmit={handleSubmit}>
                                        <Flex
                                            margin="30px 30px 8px 30px"
                                            flexDirection="column"
                                            gap="4px"
                                        >
                                            <Flex
                                                justifyContent="space-between"
                                                flexDir="row"
                                                margin="4px 0px"
                                            >
                                                <Flex
                                                    alignContent="center"
                                                    justifyContent="flex-end"
                                                    flexDirection="column"
                                                >
                                                    <Box className="container">
                                                        <Field
                                                            type="text"
                                                            name="firstName"
                                                            onChange={
                                                                handleChange
                                                            }
                                                            onBlur={handleBlur}
                                                            value={
                                                                values.firstName
                                                            }
                                                            className="input s-input"
                                                            required={true}
                                                        />
                                                        <label
                                                            htmlFor="firstName"
                                                            className="label x-small"
                                                        >
                                                            First Name
                                                        </label>
                                                    </Box>
                                                    <Box className="errorMessage">
                                                        <ErrorMessage
                                                            name="firstName"
                                                            component="span"
                                                        />
                                                    </Box>
                                                </Flex>

                                                <Flex
                                                    alignContent="center"
                                                    justifyContent="flex-end"
                                                    flexDirection="column"
                                                >
                                                    <Box className="container">
                                                        <Field
                                                            width="300px"
                                                            type="text"
                                                            name="lastName"
                                                            onChange={
                                                                handleChange
                                                            }
                                                            onBlur={handleBlur}
                                                            value={
                                                                values.lastName
                                                            }
                                                            className="input s-input"
                                                            required={true}
                                                        />
                                                        <label
                                                            htmlFor="lastName"
                                                            className="label x-small"
                                                        >
                                                            Last Name
                                                        </label>
                                                    </Box>
                                                    <Box className="errorMessage">
                                                        <ErrorMessage
                                                            name="lastName"
                                                            component="span"
                                                        />
                                                    </Box>
                                                </Flex>
                                            </Flex>

                                            <Flex
                                                alignContent="center"
                                                justifyContent="flex-end"
                                                flexDirection="column"
                                            >
                                                <Box className="container">
                                                    <Field
                                                        type="email"
                                                        name="email"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.email}
                                                        className="input l-input"
                                                        required={true}
                                                    />
                                                    <label
                                                        htmlFor="email"
                                                        className="label x-small"
                                                    >
                                                        Email
                                                    </label>
                                                </Box>
                                                <Box className="errorMessage">
                                                    <ErrorMessage
                                                        name="email"
                                                        component="span"
                                                    />
                                                </Box>
                                            </Flex>

                                            <Flex
                                                justifyContent="space-between"
                                                flexDir="row"
                                                margin="4px 0px"
                                            >
                                                <Flex
                                                    alignContent="center"
                                                    justifyContent="flex-end"
                                                    flexDirection="column"
                                                >
                                                    <Box className="container">
                                                        <Field
                                                            type="password"
                                                            name="password"
                                                            onChange={
                                                                handleChange
                                                            }
                                                            onBlur={handleBlur}
                                                            value={
                                                                values.password
                                                            }
                                                            className="input s-input"
                                                            required={true}
                                                        />
                                                        <label
                                                            htmlFor="password"
                                                            className="label x-small"
                                                        >
                                                            Password
                                                        </label>
                                                    </Box>
                                                    <Box className="errorMessage">
                                                        <ErrorMessage
                                                            name="password"
                                                            component="span"
                                                        />
                                                    </Box>
                                                </Flex>

                                                <Flex
                                                    alignContent="center"
                                                    justifyContent="flex-end"
                                                    flexDirection="column"
                                                >
                                                    <Box className="container">
                                                        <Field
                                                            type="password"
                                                            name="confirmPassword"
                                                            onChange={
                                                                handleChange
                                                            }
                                                            onBlur={handleBlur}
                                                            value={
                                                                values.confirmPassword
                                                            }
                                                            className="input s-input"
                                                            required={true}
                                                        />
                                                        <label
                                                            htmlFor="confirmPassword"
                                                            className="label x-small"
                                                        >
                                                            Confirm Password
                                                        </label>
                                                    </Box>
                                                    <Box className="errorMessage">
                                                        <ErrorMessage
                                                            name="confirmPassword"
                                                            component="span"
                                                        />
                                                    </Box>
                                                </Flex>
                                            </Flex>
                                        </Flex>

                                        <Flex
                                            margin="0px 30px"
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Button
                                                type="submit"
                                                disabled={isSubmitting}
                                                height="40px"
                                                width="120px"
                                                borderRadius="4px"
                                                bgColor="#0F0F0F"
                                                color="#FFFFFF"
                                                className="small"
                                                fontWeight="bold"
                                                border="1px solid #FFFFFF"
                                                boxShadow="-2px 4px 6px rgba(0, 0, 0, 0.5)"
                                                _hover={{
                                                    cursor: "pointer",
                                                    color: "#E5FFE4",
                                                }}
                                                _active={{
                                                    boxShadow:
                                                        "-0px 2px 6px rgba(0, 0, 0, 0.5)",
                                                    transform:
                                                        "translateY(1px) translateX(-1px)",
                                                }}
                                            >
                                                Sign up
                                            </Button>
                                        </Flex>
                                    </Form>
                                )}
                            </Formik>
                            <Flex height="160px" width="100%" flexDirection="column" position="absolute" bottom="12px" justifyContent="space-around" alignItems="center">
                                <Flex flexDirection="row" justifyContent="center" alignItems="center">
                                    <Box height="1px" width="200px" backgroundColor="#4A4A4A"></Box>
                                    <Text margin="8px" fontWeight="bold" className="x-small" color="#4A4A4A">or</Text>
                                    <Box height="1px" width="200px" backgroundColor="#4A4A4A"></Box>
                                </Flex>
                                {LoginButton()}
                                <Text color="#4A4A4A" className="x-small" >Already a user?<a href="./login"><Text className="x-small" fontWeight="medium" display="inline" margin="6px" color="#6443AB">Login</Text></a></Text>
                            </Flex>
                        </Box>
                    </Box>
                </Flex>
            </Flex>
        </>
    );
}

export default SignupPage