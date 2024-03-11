package application;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Scanner;

import entities.Product;
import entities.Supermarket;

public class Program {

	public static void main(String[] args) {
		Locale.setDefault(Locale.US);
		Scanner scan = new Scanner(System.in);
		
		Product product = new Product(12L, "oi", 2D);
		
		List<Product> listProduct = new ArrayList<>();
		listProduct.add(product);
		
		Supermarket supermarket = new Supermarket(4625L, "Atacadão", "Capim Macio", listProduct);
		
		System.out.println(supermarket.getName());
		
		scan.close();
	}
}