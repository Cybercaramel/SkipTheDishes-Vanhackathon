import React from "react";
import { StyleSheet, View } from "react-native";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Button,
  Text,
  Left,
  Body,
  Right,
  Title,
  List,
  ListItem,
  Footer,
  FooterTab,
  Icon
} from "native-base";

import StoreView from "./components/storeView";

let url = "https://api-vanhack-event-sp.azurewebsites.net/api/v1/";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      stores: [],
      isLoading: true,

      orders: [{ products: [] }]
    };
  }
  componentWillMount() {
    this.setState({ islogged: true });
    fetch(url + "Store/")
      .then(response => response.json())
      .then(response => {
        this.setState({ stores: response });
      })
      .catch(error => {
        console.log("Api call error");
        alert(error.message);
      });
  }

  login = () => {
    fetch(
      url +
        "Customer/auth?email=" +
        this.state.email +
        "&password=" +
        this.state.password,
      {
        method: "POST"
      }
    )
      .then(response => {
        if (response.status === 200) {
          this.setState({ token: response });

          this.setState({ islogged: true });
        } else {
          alert("Wrong Email or password");
        }
      })
      .catch(error => {
        console.log("Api call error");
        alert(error.message);
      });
  };

  ShowLogin() {
    return (
      <Form>
        <Item>
          <Input
            placeholder="Email"
            onChangeText={text => this.setState({ email: text })}
          />
        </Item>
        <Item last>
          <Input
            placeholder="Password"
            onChangeText={text => this.setState({ password: text })}
          />
        </Item>
        <Button full onPress={this.login}>
          <Text>Login</Text>
        </Button>
      </Form>
    );
  }

  render() {
    const storenames = this.state.stores.map(function(i) {
      return (
        <Container>
          <ListItem key={i.id} itemHeader first>
            <Text>{i.name}</Text>
          </ListItem>
          {() => this.ShowProducts(i.id)}
        </Container>
      );
    });

    return (
      <Container>
        <Header>
          <Body>
            
             
            <Title>Skip the dishes</Title>
          </Body>
        </Header>
        <Content>
          {this.state.islogged ? <StoreView /> : this.ShowLogin()}
        </Content>
       
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
