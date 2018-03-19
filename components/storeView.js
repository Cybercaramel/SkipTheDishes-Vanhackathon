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
  SwipeRow,
  Icon
} from "native-base";
import ProductList from "./Product View";
let url = "https://api-vanhack-event-sp.azurewebsites.net/api/v1/";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      stores: [],
      isLoading: true
    };
  }
  componentDidMount() {
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

  render() {
    return (
      <View>
        {this.state.stores.map(i => {
          return (
            <List key={i.id}>
              <ListItem  itemDivider>
                <Text>{i.name}</Text>
              </ListItem>
              <ListItem>
                <ProductList id={i.id} />
              </ListItem>
            </List>
          );
        })}
      </View>
    );
  }
}
