import React from "react";
import { StyleSheet, View, Alert } from "react-native";
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

let url = "https://api-vanhack-event-sp.azurewebsites.net/api/v1/";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: []
    };

    this.Order = this.Order.bind(this);
  }
  componentDidMount() {
    fetch(url + "Store/" + this.props.id + "/products")
      .then(response => response.json())
      .then(response => {
        this.setState({ products: response });
      })
      .catch(error => {
        console.log("Api call error");
        alert(error.message);
      });
  }

  Order(i) {
    fetch(url + "Order", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        id: 0,
        date: "2018-03-19T22:31:28.553Z",
        customerId: 1,
        deliveryAddress: "string",
        contact: "string",
        storeId: this.props.id,
        orderItems: [
          {
            id: 0,
            orderId: 0,
            productId: i.id,
            product: {
              id: i.id,
              storeId: this.props.id,
              name: i.name,
              description: i.description,
              price: i.price
            },
            price: i.price,
            quantity: 1,
            total: i.price
          }
        ],
        total: 0,
        status: "string",
        lastUpdate: "2018-03-19T22:31:28.553Z"
      })
    })
      .then(function(res) {
        alert("ORDER DONE")
      })
      .catch(function(res) {
        console.log(res);
      });
    /* 
Says unathorized, but the post is ok.
Didnt have time to implement redux
*/
  }
  render() {
    return (
      <Content>
        {this.state.products.map(i => {
          return (
            <ListItem key={i.id} avatar>
              <Left>
                <Button
                  rounded
                  success
                  onPress={() =>
                    Alert.alert(
                      "Confirm Order",
                      "Items:\n" + i.name,
                      [
                        {
                          text: "Cancel",
                          onPress: () => console.log("Cancel Pressed"),
                          style: "cancel"
                        },
                        { text: "OK", onPress: () => this.Order(i) }
                      ],
                      { cancelable: false }
                    )
                  }
                >
                  <Text>+</Text>
                </Button>
              </Left>
              <Body>
                <Text>{i.name}</Text>
                <Text note>{i.description}</Text>
              </Body>
              <Right>
                <Text bold>${i.price}</Text>
              </Right>
            </ListItem>
          );
        })}
      </Content>
    );
  }
}
