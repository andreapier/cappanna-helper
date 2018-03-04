import React, { Component } from "react";
import OrderDetail from "./../orderDetail/OrderDetail";
import {Card, CardHeader, CardText} from "material-ui";
import {connect} from "react-redux";

class OrderFormBody extends Component {
  renderDishes(dishList, title) {
    return (
      <div style={{ padding: 0 }}>
        <Card>
          <CardHeader
            title={title}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true} style={{ padding: 0 }}>
            {dishList.map(i => <OrderDetail detailId={i.id} key={i.id} />)}
          </CardText>
        </Card>
      </div>
    );
  }

  render() {
    const appetizers = [];
    const firstDishes = [];
    const secondDishes = [];
    const sideDishes = [];
    const desserts = [];
    const whiteWines = [];
    const redWines = [];
    const waters = [];
    const drinks = [];

    this.props.details.forEach(i => {
      if (i.group === "Antipasti") {
        appetizers.push(i);
      } else if (i.group === "Primi piatti") {
        firstDishes.push(i);
      } else if (i.group === "Secondi piatti") {
        secondDishes.push(i);
      } else if (i.group === "Contorni") {
        sideDishes.push(i);
      } else if (i.group === "Dolci") {
        desserts.push(i);
      } else if (i.group === "Vini Bianchi") {
        whiteWines.push(i);
      } else if (i.group === "Vini Rossi") {
        redWines.push(i);
      } else if (i.group === "Acqua") {
        waters.push(i);
      } else if (i.group === "Bibite") {
        drinks.push(i);
      }
    });
      
    return (
      <div>
        {this.renderDishes(appetizers, "Antipasti")}
        {this.renderDishes(firstDishes, "Primi")}
        {this.renderDishes(secondDishes, "Secondi")}
        {this.renderDishes(sideDishes, "Contorni")}
        {this.renderDishes(desserts, "Dolci")}
        {this.renderDishes(whiteWines, "Vini Bianchi")}
        {this.renderDishes(redWines, "Vini Rossi")}
        {this.renderDishes(waters, "Acqua")}
        {this.renderDishes(drinks, "Bibite")}
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
        details: state.newOrder.details
    };
};

export default connect(mapStateToProps)(OrderFormBody);