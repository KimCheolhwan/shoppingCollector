package study.shoppingCollector.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Item {
    private int item_id;
    private int category_id;
    private String categoryName;
    private int amount;
    private String unit;
    private String warehouseDate;
    private String manufacturer;
    private String name;
    private List<Item> childProductList;
}
