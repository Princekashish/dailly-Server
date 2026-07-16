import { NextFunction, Request, Response } from "express";
import { LaundryItem } from "../../../../models/Laundry/laundryItem.model";
export const laundryItemsController = {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const {
                category,
                name,
                description,
                image,
                price,
                isActive,
            } = req.body;

            const existing = await LaundryItem.findOne({
                category,
                name: name.toLowerCase().trim(),
            });

            if (existing) {
                return res.status(400).json({
                    success: false,
                    message: "Item already exists",
                });
            }

            const item = await LaundryItem.create({
                category,
                name: name.toLowerCase().trim(),
                description,
                image,
                price,
                isActive,
            });

            return res.status(201).json({
                success: true,
                data: item,
            });
        } catch (err) {
            next(err);
        }
    },
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {

            const items = await LaundryItem.find({ isActive: true }).populate("category").sort({ createdAt: 1 });
            return res.status(200).json({
                success: true,
                data: items,
            });

        } catch (error) {
            next(error)
        }
    },
    async getByCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const { categoryId } = req.params;

            const items = await LaundryItem.find({
                category: categoryId,
                isActive: true,
            });

            return res.status(200).json({
                success: true,
                data: items,
            });
        } catch (err) {
            next(err);
        }
    },
    async updateItem(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const { name, description, image, price, isActive, category } = req.body

            const existing = await LaundryItem.findOne({
                category,
                name: name.toLowerCase().trim(),
                _id: { $ne: id }, // Ignore the current item
            });

            if (existing) {
                return res.status(400).json({
                    success: false,
                    message: "Item already exists",
                });
            }
            const update = await LaundryItem.findByIdAndUpdate(id, {
                category,
                name,
                description,
                image,
                price,
                isActive
            }, {
                new: true,
                runValidators: true,
            })
            return res.status(200).json({ success: true, data: update })

        } catch (error) {
            next(error)
        }

    },
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const item = await LaundryItem.findByIdAndDelete(id)
            if (!item) {
                return res.status(404).json({ success: false, message: "Item not found" })
            }
            return res.status(200).json({ success: true, message: "Item deleted" });

        } catch (error) {
            next(error)

        }
    }


};