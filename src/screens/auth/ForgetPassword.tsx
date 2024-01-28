import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import {
	Alert,
	TouchableOpacity,
	View,
	Dimensions,
	Text,
	StyleSheet,
	ImageBackground,
	TextInput,
} from "react-native";

// import { auth } from "../../../firebaseConfig";
import { Color } from "../../assets/GlobalStyles";
// google provider
import TextComponent from "../../component/atom/CustomText";
import { blurBackground, tell_story } from "../../assets/images";

const width = Dimensions.get("window").width;

const ForgetPassword = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);

	// handle login with google account

	const handleResetAccount = async () => {
		// handle reset account with firebase
		// check if email 's valid with regex
		const emailRegex = /\S+@\S+\.\S+/;
		if (!emailRegex.test(email)) {
			Alert.alert("Error", "Email is invalid");
			return;
		}

		try {
			setLoading(true);
			await sendPasswordResetEmail(getAuth(), email);
			Alert.alert("Success", "Check your email to reset password");
		} catch (error) {
			Alert.alert("Error", error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: Color.primary,
			}}
		>
			<ImageBackground
				source={blurBackground}
				resizeMode="cover"
				style={styles.image}
			>
				<View style={styles.buttonsGoogle}>
					<View style={{ marginTop: 80 }}>
						<TextComponent
							fontSize={42}
							color="#fff"
							fontWeight="bold"
						>
							PoteKOLE
						</TextComponent>
						<TextComponent
							fontSize={17}
							color="#fff"
							fontWeight="bold"
						>
							Reset your account
						</TextComponent>
					</View>

					<View
						style={{
							width: width,
						}}
					>
						<TextInput
							placeholder="Email"
							onChangeText={(text) => {
								setEmail(text);
							}}
							value={email}
							placeholderTextColor={Color.white}
							style={styles.textInput}
						></TextInput>

						<TouchableOpacity
							disabled={loading || !email}
							style={[
								styles.signButton,
								{
									backgroundColor: Color.secondary,
									borderColor: Color.secondary,
									padding: 12,
									marginTop: 16,
									width: width - 64,
								},
							]}
							onPress={handleResetAccount}
						>
							<TextComponent color="#fff">Sign In</TextComponent>
						</TouchableOpacity>
					</View>
				</View>
			</ImageBackground>
		</View>
	);
};

export default ForgetPassword;

const styles = StyleSheet.create({
	image: {
		flex: 1,
		justifyContent: "flex-start",
	},
	container: {
		flex: 1,
		alignItems: "center",
	},
	containerImage: {
		flex: 1,
		backgroundColor: "#FFFFFF",
		width: "100%",
		alignItems: "center",
	},
	logo: {
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height / 2.2,
	},
	buttonsContainer: {
		flex: 3,
		width: "100%",
		backgroundColor: Color.white,
	},
	WelcomeBox: {
		padding: 26,
	},
	buttonsGoogle: {
		marginHorizontal: 32,
	},
	buttonsPhone: {
		marginHorizontal: 32,
	},

	textWelcome: {
		alignItems: "center",
		marginTop: 16,
		lineHeight: 21,
		fontSize: 19,
		color: "#ffffff",
		fontFamily: "calibri",
	},
	signButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 8,
		backgroundColor: "#DDDDDD",
		borderRadius: 32,
		marginBottom: 16,
		borderColor: Color.white,
		borderWidth: 1,
	},
	phoneNumberIcon: {
		marginRight: 12,
	},
	signText: {
		marginTop: 16,
	},
	button: {
		width: 160,
	},
	textInput: {
		color: Color.white,
		borderRadius: 8,
		marginBottom: 16,
		height: 40,
		paddingHorizontal: 10,
		width: width - 64,
		borderColor: Color.white,
		borderWidth: 1,
	},
});
