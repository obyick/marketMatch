package entities;

import java.util.ArrayList;
import java.util.List;

public class Supermarket {
	private Long id;
	private String name;
	private String location;
	private List<Product> product = new ArrayList<>();

	public Supermarket(Long id, String name, String location, List<Product> product) {
		this.id = id;
		this.name = name;
		this.location = location;
		this.product = product;
	}

	public Long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public void addProduct(Product product) {
		this.product.add(product);
	}
	
	public void removeProduct(Product product) {
		this.product.remove(product);
	}
}
