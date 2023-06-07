import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Portfolio } from 'src/entities/portfolio/portfolio.schema';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectModel(Portfolio.name)
    private readonly portfolioModel: Model<Portfolio>,
  ) {}

  async getAllPortfolios() {
    return this.portfolioModel.find().lean();
  }

  async createPortfolio(blog) {
    return await this.portfolioModel.create(blog);
  }

  async viewPortfolio(id) {
    return await this.portfolioModel.findById(id);
  }

  async editPortfolio(id, blog) {
    console.log(id);
    return await this.portfolioModel.findByIdAndUpdate(id, blog);
  }

  async deletePortfolio(id) {
    return await this.portfolioModel.findByIdAndDelete(id);
  }
}
