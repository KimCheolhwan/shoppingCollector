package study.shoppingCollector.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class Category {
    String name;

    public Category(String name) {
        this.name = name;
    }
}
