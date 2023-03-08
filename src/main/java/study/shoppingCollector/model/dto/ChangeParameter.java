package study.shoppingCollector.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChangeParameter {
    private String user_id;
    private String prodNm;
    private String newManufacturer;
    private String newWarehouseDt;
    private String newCategoryNm;
    private String newUnit;
    private int newCategoryId;
    private String oldProdNm;
    private String newProdNm;
}
