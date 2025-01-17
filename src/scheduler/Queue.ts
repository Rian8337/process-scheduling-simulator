/**
 * Represents a queue.
 */
export class Queue<T> {
    /**
     * The items in this queue.
     */
    protected readonly items: T[] = [];

    /**
     * The number of items in this queue.
     */
    get length() {
        return this.items.length;
    }

    /**
     * Whether this queue is empty.
     */
    get isEmpty(): boolean {
        return this.items.length === 0;
    }

    /**
     * Enqueues an item into this queue.
     *
     * @param item The item to enqueue.
     */
    enqueue(item: T) {
        this.items.push(item);
    }

    /**
     * Dequeues an item from this queue.
     *
     * @returns The dequeued item, `null` if there are no items in this queue.
     */
    dequeue(): T | null {
        return this.items.shift() ?? null;
    }

    /**
     * Retrieves, but does not remove, the item at the front of this queue.
     *
     * @returns The item at the front of this queue, `null` if there are no items in this queue.
     */
    peek(): T | null {
        return this.items.at(0) ?? null;
    }

    /**
     * Clears this queue.
     */
    clear() {
        this.items.length = 0;
    }

    /**
     * Clones this queue.
     *
     * @param withItems Whether to clone the items in this queue.
     * @returns The cloned queue.
     */
    clone(withItems: boolean): Queue<T> {
        const queue = new Queue<T>();

        if (withItems) {
            queue.items.push(...this.items);
        }

        return queue;
    }
}
