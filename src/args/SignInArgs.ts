import { ArgsType, Field } from "type-graphql";
import SignInInputData from "../inputs/SignInInputData";

@ArgsType()
export default class SignInArgs {
  @Field(() => SignInInputData)
  data: SignInInputData
}