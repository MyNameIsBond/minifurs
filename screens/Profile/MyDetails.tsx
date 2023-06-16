import { View, Text, TextInput, Button } from "react-native";
import MyButton from "../../components/reusables/MyButton";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import {
  changeInput,
  editToggle,
  editAddressToggle,
} from "../../app/features/userDetails";
import { useUser } from "../../lib/helpers/UserContext";
import {
  useSetUserAddressMutation,
  useSetUserDetailsMutation,
} from "../../app/services/userDetails";
import UserDetailsContainer from "../../components/profile/UserDetailsContainer";

export default function MyDetails() {
  const { id, email, address, username: fullname, phone_number } = useUser();

  const { edit, phone, username, road, town, county, postCode, editAddress } =
    useAppSelector((state: RootState) => state.userDetails);
  const dispatch = useAppDispatch();
  const [setAddress] = useSetUserAddressMutation();
  const [setUserDetail] = useSetUserDetailsMutation();

  const handleChange = (text: string, name: string) => {
    dispatch(changeInput({ name, text }));
  };

  return (
    <View>
      {edit ? (
        <UserDetailsContainer title="User">
          <TextInput
            className="border py-4 pl-2 pr-10 rounded-md border-green-900 border-opacity-80 bg-gray-50"
            onChangeText={(text) => handleChange(text, "username")}
            value={username}
            placeholder="Full Name"
            autoCapitalize={"none"}
          />
          <TextInput
            className="border py-4 pl-2 pr-10 rounded-md border-green-900 border-opacity-80 mb-5 bg-gray-50"
            onChangeText={(text) => handleChange(text, "phone")}
            value={phone}
            placeholder="Phone Number"
            autoCapitalize={"none"}
          />
          <View className="flex-row justify-around w-full">
            <View className="flex-col items-start">
              <Button title="cancel" onPress={() => dispatch(editToggle())} />
            </View>
            <View>
              <MyButton
                title="Save"
                onPress={() => {
                  setUserDetail({
                    name: username,
                    email: email,
                    phone_number: phone,
                    user_id: id,
                  });
                  dispatch(editToggle());
                }}
              />
            </View>
          </View>
        </UserDetailsContainer>
      ) : (
        <UserDetailsContainer title="User">
          <Text>Fullname: {fullname ? fullname : "no fullname"}</Text>
          <Text>Phone: {phone_number ? phone_number : "no phone number"}</Text>
          <Button title="edit" onPress={() => dispatch(editToggle())} />
        </UserDetailsContainer>
      )}
      {editAddress ? (
        <UserDetailsContainer title="Address">
          <TextInput
            className="border py-4 pl-2 pr-10 rounded-md border-green-900 border-opacity-80 bg-gray-50"
            onChangeText={(text) => handleChange(text, "road")}
            value={road}
            placeholder="Road"
            autoCapitalize={"none"}
          />
          <TextInput
            className="border py-4 pl-2 pr-10 rounded-md border-green-900 border-opacity-80 bg-gray-50"
            onChangeText={(text) => handleChange(text, "town")}
            value={town}
            placeholder="Town"
            autoCapitalize={"none"}
          />
          <TextInput
            className="border py-4 pl-2 pr-10 rounded-md border-green-900 border-opacity-80 bg-gray-50"
            onChangeText={(text) => handleChange(text, "county")}
            value={county}
            placeholder="County"
            autoCapitalize={"none"}
          />
          <TextInput
            className="border py-4 pl-2 pr-10 rounded-md border-green-900 border-opacity-80 bg-gray-50 mb-6"
            onChangeText={(text) => handleChange(text, "postCode")}
            value={postCode}
            placeholder="Post code"
            autoCapitalize={"none"}
          />
          <View className="flex-row justify-around w-full">
            <View className="flex-col items-start">
              <Button
                title="cancel"
                onPress={() => dispatch(editAddressToggle())}
              />
            </View>
            <View>
              <MyButton
                title="Save"
                onPress={() => {
                  setAddress({
                    user_id: id,
                    road,
                    county,
                    postCode,
                    town,
                  });
                  dispatch(editAddressToggle());
                }}
              />
            </View>
          </View>
        </UserDetailsContainer>
      ) : (
        <UserDetailsContainer title="Address">
          <Text>Road: {address.road ? address.road : "provide address"}</Text>
          <Text>Town: {address.town ? address.town : "provide address"}</Text>
          <Text>
            County: {address.county ? address.county : "provide address"}
          </Text>
          <Text>
            Post Code:{" "}
            {address.post_code ? address.post_code : "provide address"}
          </Text>
          <Button
            title="edit"
            onPress={() => {
              dispatch(editAddressToggle());
            }}
          />
        </UserDetailsContainer>
      )}
    </View>
  );
}
