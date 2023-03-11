package study.shoppingCollector.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateCategoryName {
    private int user_id;
    private String oldCategoryName;
    private String newCategoryName;
}
