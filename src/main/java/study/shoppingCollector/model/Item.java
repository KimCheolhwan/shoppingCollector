package study.shoppingCollector.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class Item {

    String name;
    int amount;
    String unit;
    String manufacturer;
    String warehouseDate;
    String categoryName;
    List<Item> childProductList;
    public Item(String name, int amount, String unit, String manufacturer, String warehouseDate, String categoryName) {
        this.name = name;
        this.amount = amount;
        this.unit = unit;
        this.manufacturer = manufacturer;
        this.warehouseDate = warehouseDate;
        this.categoryName = categoryName;
    }

    public Item(String name, int amount, String unit, String manufacturer, String warehouseDate, String categoryName, List<Item> childProductList) {
        this.name = name;
        this.amount = amount;
        this.unit = unit;
        this.manufacturer = manufacturer;
        this.warehouseDate = warehouseDate;
        this.categoryName = categoryName;
        this.childProductList = childProductList;
    }
}
