package study.shoppingCollector.api;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import study.shoppingCollector.model.dto.Category;
import study.shoppingCollector.model.dto.Composite;
import study.shoppingCollector.model.dto.Item;
import study.shoppingCollector.model.dto.User;
import study.shoppingCollector.service.TestService;

import javax.servlet.http.HttpServletRequest;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@RequiredArgsConstructor
public class InventoryController {

    private final TestService testService;

    private final ObjectMapper mapper = new ObjectMapper();

    public final User user = new User(1,"jasd0330@naver.com","12341234", new Timestamp(System.currentTimeMillis()), new Timestamp(System.currentTimeMillis()));

    @GetMapping("/inventory/categories")
    public ResponseEntity<List<Category>> categories(HttpServletRequest request, Model model) {
        log.info("@GetMapping(\"/inventory/categories\")");
        List<Category> list = testService.getAllCategoryList(user);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/inventory/product")
    public ResponseEntity<List<Item>> items(@RequestParam(value = "categoryName") String categoryName, @RequestParam(value = "query") String query) {
        log.info(" @GetMapping(\"/inventory/product\")");
        log.info("categoryName{} query{}",categoryName, query);
        List<Item> items;
        List<Item> childs;
        Category category = testService.getCategory(new Category(categoryName, 0, 1));

        items = category == null ? testService.selectAllItems(1) : testService.getItemInCategory(category);

        for (Item item : items) {
            item.setCategoryName(testService.selectCategoryName(item.getCategory_id()));
            childs = testService.selectChildItem(item);

            for(Item child : childs)
                child.setCategoryName(testService.selectCategoryName(child.getCategory_id()));

            item.setChildProductList(childs);
        }
        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    @PostMapping("/inventory/product")
    public ResponseEntity<HttpStatus> insertItem(@RequestBody String param) throws JsonProcessingException {
        log.info("@PostMapping(\"/inventory/product\")");
        log.info(param.toString());

        Category category;

        List<Item> items = mapper.readValue(param, new TypeReference<>() {});

        for (Item item : items)
        {
            category = testService.getCategory(new Category(item.getCategoryName(), 0, user.getUser_id()));
            item.setCategory_id(category.getCategory_id());
            item.setChildProductList(new ArrayList<Item>());
            testService.insertItem(item);
        }
        return new ResponseEntity<>(HttpStatus.OK);

    }

    @PostMapping("/inventory/category")
    public ResponseEntity<HttpStatus> insertCategory(@RequestParam(value = "categoryName") String categoryName)
    {
        System.out.println("@PostMapping(\"/inventory/category\")");
        Category category = new Category();
        category.setUser_id(1);
        category.setName(categoryName);
        testService.insertCategory(category);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/inventory/category")
    public ResponseEntity<HttpStatus> deleteCategory(@RequestParam(value = "categoryName") String categoryName)
    {
        System.out.println("@DeleteMapping(\"/inventory/category\")");
        Category category = new Category();
        category.setUser_id(1);
        category.setName(categoryName);
        testService.deleteCategory(category);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/inventory/category")
    public ResponseEntity<HttpStatus> putCategory(@RequestParam(value = "oldCategoryName") String oldCategoryName,
                                                  @RequestParam(value = "newCategoryName") String newCategoryName)
    {
        System.out.println("@PutMapping(\"/inventory/category\")");
        Category checkCategory = new Category();
        checkCategory.setUser_id(1);
        checkCategory.setName(newCategoryName);

        if(testService.getCategory(checkCategory) == null)
        {
            HashMap<String, String> map = new HashMap<>();
            map.put("oldCategoryName", oldCategoryName);
            map.put("newCategoryName", newCategoryName);
            map.put("user_id","1");

            testService.updateCategoryName(map);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else
        {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/inventory/product/name")
    public ResponseEntity<HttpStatus> putName(@RequestBody Map<String,Object> param)
    {
        log.info("@PutMapping(\"/inventory/product/name\")");
        log.info("param: " + param.toString());

        HashMap<String, Object> map = new HashMap<>();
        map.put("user_id", "1");

        map.put("oldProdNm", param.get("oldProdNm"));
        map.put("newProdNm", param.get("newProdNm"));
        testService.updateProductName(map);

        return new ResponseEntity<>(HttpStatus.OK);

    }

    @PutMapping("/inventory/product/{targetColumn}")
    public ResponseEntity<HttpStatus> putParameter(@RequestBody List<Map<String,Object>> param,
                                                   @PathVariable(value = "targetColumn") String targetColumn) throws JsonProcessingException {
        log.info("@PutMapping(\"/inventory/product/{targetColumn}\")");
        log.info("param: " + param.toString());
        log.info("targetColumn: " + targetColumn);
        HashMap<String, Object> map = new HashMap<>();
        map.put("user_id", "1");

        switch (targetColumn) {
        case "manufacturer":
            for (Map<String, Object> stringObjectMap : param) {
                map.put("prodNm", stringObjectMap.get("prodNm"));
                map.put("newManufacturer", stringObjectMap.get("newManufacturer"));
                testService.updateManufacturer(map);
            }
            break;
        case "warehouseDate":
            for (Map<String, Object> stringObjectMap : param) {
                map.put("prodNm", stringObjectMap.get("prodNm"));
                map.put("newWarehouseDt", stringObjectMap.get("newWarehouseDt"));
                testService.updateWarehouseDate(map);
            }
            break;
        case "category":
            Category category = new Category();
            for (Map<String, Object> stringObjectMap : param) {
                category.setUser_id(1);
                category.setName(stringObjectMap.get("newCategoryNm").toString());

                category = testService.getCategory(category);
                map.put("prodNm", stringObjectMap.get("prodNm"));
                map.put("newCategoryId", category.getCategory_id());
                testService.updateCategory(map);
            }
            break;
        case "unit":
            for (Map<String, Object> stringObjectMap : param) {
                map.put("prodNm", stringObjectMap.get("prodNm"));
                map.put("newUnit", stringObjectMap.get("newUnit"));
                testService.updateUnit(map);
            }
            break;
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/inventory/product-link")
    public ResponseEntity<HttpStatus> insertProdLink(@RequestBody List<Map<String,Object>> param)
    {
        Item parentItem;
        Item childItem;
        Composite composite = new Composite();
        for(Map<String,Object> product : param)
        {
            parentItem = testService.selectOneItem(product.get("parentProdNm"));
            childItem = testService.selectOneItem(product.get("childProdNm"));
            composite.setItem_id(parentItem.getItem_id());
            composite.setReference_id(childItem.getItem_id());
            testService.insertChild(composite);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/inventory/product")
    public ResponseEntity<HttpStatus> deleteProduct(@RequestBody List<String> param)
    {
        for (String name : param)
            testService.deleteProduct(name);

        return new ResponseEntity<>(HttpStatus.OK);

    }

    @DeleteMapping("/inventory/product-link")
    public ResponseEntity<HttpStatus> deleteProdLink(@RequestBody List<Map<String,Object>> param) {
        Item parentItem;
        Item childItem;
        Composite composite = new Composite();
        for(Map<String,Object> product : param)
        {
            parentItem = testService.selectOneItem(product.get("parentProdNm"));
            childItem = testService.selectOneItem(product.get("childProdNm"));
            composite.setItem_id(parentItem.getItem_id());
            composite.setReference_id(childItem.getItem_id());
            testService.deleteChild(composite);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
