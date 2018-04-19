import React, { Component } from "react";
import OrderDetail from "./../orderDetail/OrderDetail";
import ExpansionPanel, { ExpansionPanelSummary, ExpansionPanelDetails } from "material-ui/ExpansionPanel";
import { connect } from "react-redux";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
});

class OrderFormBody extends Component {
  renderDishes(dishList, title) {
    return (
      <div className={this.props.classes.root}>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={this.props.classes.heading}>{title}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div>{dishList.map(i => <OrderDetail detailId={i.id} key={i.id} />)}</div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
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

export default connect(mapStateToProps)(withStyles(styles)(OrderFormBody));
