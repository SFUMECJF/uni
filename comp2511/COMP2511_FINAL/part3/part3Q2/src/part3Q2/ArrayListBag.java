package part3Q2;

import java.util.ArrayList;
import java.util.Iterator;

/**
 * A bag implemented using an ArrayList.
 *
 * @author Robert Clifton-Everest
 *
 * @invariant for all c in counts, c.getCount() > 0
 *
 * @param <E>
 */
public class ArrayListBag<E> implements Bag<E> {

    private ArrayList<Count<E>> counts;

    /**
     * Create a new empty bag.
     */
    public ArrayListBag() {
        this.counts = new ArrayList<Count<E>>();
    }

    private Count<E> getCount(Object o) {
        for (Count<E> c : counts)
            if (c.getElement().equals(o))
                return c;
        return null;
    }

    @Override
    public void add(E e) {
        add(e,1);
    }

    @Override
    public void add(E e, int n) {
        Count<E> c = getCount(e);
        if (c != null) {
            c.incrementCount(n);
        } else if (n > 0) {
            counts.add(new Count<E>(e, n));
        }
    }

    @Override
    public void remove(E e) {
        remove(e, 1);
    }

    @Override
    public void remove(E e, int n) {
        // TODO Implement this
        /**
         * @precondition n >= 0
         * @postcondition count(e) = max(oldcount(e) - n, 0)
         */
        int counter = 0;
        Count<E> aCount = this.getCount(e);
        if (aCount.getCount() < n) {
            aCount.decrementCount(aCount.getCount());
        } else {
            while (counter < n) {
                aCount.decrementCount(1);
                if (aCount.getCount() == 0) {
                    break;
                }
                counter++;
            } 
        }
    }

    @Override
    public int count(Object o) {
        Count<E> c = getCount(o);
        if (c != null)
            return c.getCount();
        return 0;
    }

    @Override
    public int size() {
        // TODO Implement this
        int counter = 0;
        for (Count<E> aCount: counts) {
            counter+= aCount.getCount();
        }
        return counter;
    }

    @Override
    public Bag<E> sum(Bag<? extends E> bag) {
        // TODO Implement this
        Bag<E> newBag = new ArrayListBag<E>();

        for (Count<E> aCount : counts) {
            if (bag.count(aCount) > 0) {
                newBag.add(aCount.getElement(), aCount.getCount() + bag.count(aCount));
            }
        }
        return newBag;
    }

    @Override
    public Iterator<Count<E>> iterator() {
        return counts.iterator();
    }

    /**
     * For this method, it should be possible to compare all other possible bags
     * for equality with this bag. For example, if an ArrayListBag<Fruit> and a
     * LinkedListBag<Fruit> both contain the same number of each element they
     * are equal. Similarly, if a Bag<Apple> contains the same elements as a
     * Bag<Fruit> they are also equal.
     */
    @Override
    public boolean equals(Object o) {
        // TODO Implement this

        // default
        if (o == null) {return false;}
        if (this == o) {return true;}

        // check instance
        if (!(o instanceof Bag)) {return false;}

        Bag<E> checker = new ArrayListBag<E>();

        try {
            checker = (Bag<E>) o;
        } catch (ClassCastException e) {
            return false;
        }

        // check their sizes (all counts)
        if (checker.size() != this.size()) {return false;}

        // iterate to find if equals
        Iterator<Count<E>> iter = checker.iterator();

        // checks all contains for if contains and if their counts are ok
        while (iter.hasNext()) {
            Count<E> test = iter.next();
            if (!counts.contains(test)) {return false;}
            else {
                if (this.count(test) != test.getCount()) {return false;}
            }
        }
        // everything is equal including counts
        return true;
    }
}
